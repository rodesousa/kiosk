# Refacto : `useDimensionState`

## Probleme

Dans `new3.tsx`, chaque dimension (pays, region, contrat) repetait le meme pattern :

```ts
const [headcount, setHeadcount] = useState<TableData>({})
const [average, setAverage] = useState<TableData>({})

useEffect(() => {
  setHeadcount(sourceData)
  setAverage(sourceData)
}, [sourceData])

// + updateRow(setHeadcount, row, col, val)
```

Soit **6 `useState`**, **3 `useEffect`**, et une fonction `updateRow` qui prenait un setter en argument.

## Solution

Un custom hook `useDimensionState` qui encapsule ce pattern :

```ts
const [headcount, average, update] = useDimensionState(sourceData)
```

Chaque appel retourne :
- `headcount` : le state editable (initialise depuis la source)
- `average` : idem
- `update(target, row, col, val)` : fonction stable (`useCallback`) pour modifier une cellule

## Analogie Elixir/OTP

Un custom hook React se comporte comme un `GenServer`.

Quand on ecrit :

```ts
const [countryHeadcount, countryAverage, updateCountry] = useDimensionState(countrySource)
const [regionHeadcount, regionAverage, updateRegion]     = useDimensionState(regionSource)
const [contractHeadcount, contractAverage, updateContract] = useDimensionState(contractSource)
```

C'est equivalent a demarrer 3 GenServers independants :

```elixir
{:ok, country_pid}  = GenServer.start_link(DimensionState, country_source)
{:ok, region_pid}   = GenServer.start_link(DimensionState, region_source)
{:ok, contract_pid} = GenServer.start_link(DimensionState, contract_source)
```

Chaque instance :
- Possede son propre state (`headcount`, `average`)
- Reagit au changement de sa source (comme un `handle_info` qui recoit de nouvelles donnees)
- Expose sa propre fonction d'update (comme un `GenServer.call`)
- Ne partage rien avec les autres instances

La difference : en OTP les GenServers tournent dans des process separes. En React, les hooks sont des "slots de state" attaches au meme composant, mais isoles les uns des autres. React garantit que modifier `updateCountry` ne touche que le state country.

## Avant / Apres

### Avant (new3.tsx)

```
6 useState
3 useEffect
1 updateRow (avec setter en argument)
~60 lignes de JSX duplique
```

### Apres

```
3 appels a useDimensionState  (remplace les 6 useState + 3 useEffect + updateRow)
3 <DimensionSection />        (remplace les ~60 lignes de JSX)
```

Ajouter une nouvelle dimension (ex: age, anciennete) = 1 `useMemo` + 1 `useDimensionState` + 1 `<DimensionSection />`.
