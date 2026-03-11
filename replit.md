# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── portfolio/          # Sinde Saikiran Portfolio (React + Vite)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## Portfolio App (artifacts/portfolio)

Sinde Saikiran's personal developer portfolio featuring:
- **Hero Section**: Animated typing effect, 3D star background, social links
- **Profile Section**: Glassmorphism card with bio and links
- **Skills Section**: Categorized skill cards (Python, JS, Java, React Native, Node.js, etc.)
- **Projects Section**: 5 project cards with hover effects and GitHub links
- **GitHub Stats Section**: GitHub readme-stats widgets
- **Achievements Section**: Timeline cards
- **AI Chatbot**: Floating chatbot assistant answering portfolio questions
- **Contact Section**: Form with backend storage in PostgreSQL

## API Endpoints

- `GET /api/healthz` - Health check
- `GET /api/projects` - Returns all 5 portfolio projects
- `GET /api/skills` - Returns skills by category
- `POST /api/contact` - Stores contact messages in PostgreSQL
- `POST /api/chatbot` - AI chatbot responses about the portfolio

## Database Schema

- `contacts` table: id, name, email, message, createdAt

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references.

- **Always typecheck from the root** — run `pnpm run typecheck`
- **`emitDeclarationOnly`** — only `.d.ts` files during typecheck

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API types from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes
