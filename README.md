# Kiosk

## Run the project

```bash
npm install
```

### Dev

```bash
npm run dev
```

App available at `http://localhost:5173`.

### Build & start

```bash
npm run build
npm run start
```

## Notes

I'm not primarily a React/TypeScript developer. My TypeScript experience is mainly around using frontend libraries within [Phoenix](https://www.phoenixframework.org/) projects, not building standalone React/TS applications.

I chose this stack to match the Kiosk stack, not out of habit, but I'm comfortable adapting to new stacks quickly.

### if you used AI, how you used it

I understand this test focuses on the ability to write code. So the majority of the code was written without AI.

AI was used for:
- Debugging
- Help building the export logic ./app/services/export-word.ts
- Creating mapping files like ./app/dsn/country.ts, ./app/dsn/contrat-nature.ts
- Test generation
- Documentation

### what you would improve next

I assumed that dsn.txt files are always valid, but the next step would be to add error handling and field validation for each DSN entity. Add a database and handle persistence with Prisma.
