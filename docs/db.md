To get the .env DATABASE_URL
go to vercel, integrations, neon, realestate, then under .env.local you'll find DATABASE_URL= (reveal then copy)

To push changes from drizzle src/db/schema.ts
```npx drizzle-kit generate```
```npx drizzle-kit migrate```

