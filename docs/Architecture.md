# CMS Masjid — Architecture

## Architecture Overview

Client (Browser)
      │
      ▼
Next.js App Router
      │
      ├── Server Components
      ├── Client Components
      ├── Server Actions
      └── Middleware
      │
      ▼
Prisma ORM
      │
      ▼
Neon PostgreSQL

---

## Folder Structure

src/
├── app/
│   ├── (public)/
│   ├── dashboard/
│   ├── api/
│   └── layout.tsx
│
├── actions/
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── articles/
│   ├── events/
│   └── gallery/
│
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   └── utils.ts
│
├── hooks/
│
├── types/
│
├── validations/
│
└── middleware.ts

---

## Application Layers

### Presentation Layer
- React Components.
- Tailwind CSS.
- shadcn/ui.

### Business Layer
- Server Actions.
- Authentication.
- Validation.

### Data Layer
- Prisma Client.
- PostgreSQL (Neon).

---

## Routing

### Public Routes

/
├── articles
├── articles/[slug]
├── announcements
├── events
├── gallery
└── about

### Dashboard Routes

/dashboard
├── articles
├── announcements
├── events
├── gallery
├── profile
└── settings

---

## Authentication Flow

Login Page
     │
     ▼
Server Action
     │
     ▼
Verify User (Prisma)
     │
     ▼
JWT Session
     │
     ▼
Dashboard

---

## Data Flow

User Action
     │
     ▼
Form
     │
     ▼
Server Action
     │
     ▼
Prisma
     │
     ▼
Neon PostgreSQL
     │
     ▼
Revalidate Path
     │
     ▼
Updated UI