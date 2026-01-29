# Browser vs Server - Compatibilité des APIs

## Node.js Only (Serveur)

Ces modules ne fonctionnent que côté serveur :

```typescript
// Système de fichiers
import { readFile, writeFile } from "fs/promises"
import fs from "fs"

// Chemins système
import path from "path"

// Processus système
import { exec } from "child_process"
import process from "process"

// Réseau bas niveau
import http from "http"
import https from "https"
import net from "net"

// Crypto (certaines fonctions)
import crypto from "crypto"

// Streams Node.js
import { Readable, Writable } from "stream"

// Base de données
import { PrismaClient } from "@prisma/client"
```

## Browser Only (Client)

Ces APIs ne fonctionnent que dans le navigateur :

```typescript
// DOM
document.getElementById()
window.location
localStorage / sessionStorage

// Fichiers utilisateur
FileReader  // Lire un fichier uploadé par l'utilisateur
File        // Objet fichier du navigateur
Blob        // Données binaires

// Événements utilisateur
onClick, onDrop, onSubmit, etc.

// APIs navigateur
navigator.geolocation
navigator.clipboard
Notification API
Web Workers
```

## Compatible Partout (Browser + Server)

```typescript
// Fetch (natif dans les deux)
fetch("https://api.example.com")

// JSON
JSON.parse() / JSON.stringify()

// Manipulation de strings
string.split(), string.match(), regex, etc.

// Arrays / Objects
array.map(), array.filter(), Object.keys(), etc.

// Promises / async-await
async function foo() { await bar() }

// Classes / Types
class MyClass {}
interface MyType {}

// Bibliothèques "isomorphiques"
import { z } from "zod"        // Validation
import dayjs from "dayjs"      // Dates
import lodash from "lodash"    // Utilitaires
```

## Ton Parser - Analyse

```typescript
// ❌ Node.js only - À SUPPRIMER
import { readFile } from "fs/promises"

// ✅ Compatible partout - À GARDER
import { type Entreprise } from "./entities/entreprise"  // Types
string.split("\n")                                        // String manipulation
switch/case                                               // Logique JS
object.field = value                                      // Assignation
```

## Comment lire un fichier ?

| Contexte | Méthode |
|----------|---------|
| **Serveur** lit fichier sur disque | `fs.readFile("./data.txt")` |
| **Browser** lit fichier uploadé | `FileReader.readAsText(file)` |
| **Browser** fetch fichier distant | `fetch("/api/data.txt")` |

### Exemple FileReader (Browser)

```typescript
const handleDrop = (files: File[]) => {
  const file = files[0]
  const reader = new FileReader()

  reader.onload = (event) => {
    const content = event.target?.result as string
    // content = le texte du fichier
    const dsn = parseDSN(content)
  }

  reader.readAsText(file)
}
```

## React Router / Remix - Où tourne quoi ?

```
┌─────────────────────────────────────────────────────────┐
│                      SERVEUR                            │
│  ┌─────────────────────────────────────────────────┐   │
│  │  loader()   → GET  → peut utiliser fs, DB, etc  │   │
│  │  action()   → POST → peut utiliser fs, DB, etc  │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          │
                          │ HTTP (réseau)
                          ▼
┌─────────────────────────────────────────────────────────┐
│                      BROWSER                            │
│  ┌─────────────────────────────────────────────────┐   │
│  │  export default function Page()                 │   │
│  │  → Composants React                             │   │
│  │  → useState, useEffect                          │   │
│  │  → onClick, FileReader, DOM                     │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## Erreurs courantes

| Erreur | Cause |
|--------|-------|
| `Cannot access 'fs/promises.readFile' in client code` | Tu importes `fs` dans un composant React |
| `document is not defined` | Tu utilises `document` dans un loader/action |
| `window is not defined` | Tu utilises `window` côté serveur |
