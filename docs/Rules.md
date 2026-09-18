# CMS Masjid — Development Rules

## Project Rules

Semua development mengikuti aturan berikut.

---

## General Rules

- Gunakan TypeScript.
- Gunakan App Router.
- Gunakan Server Actions untuk CRUD.
- Jangan menggunakan API Route kecuali benar-benar diperlukan.
- Semua query database melalui Prisma.

---

## Naming Convention

### File

PascalCase
ArticleForm.tsx

camelCase
articles.ts
prisma.ts

### Variables

camelCase

articleName
createdAt

### Components

PascalCase

DeleteArticleButton

---

## Folder Rules

components/
Reusable UI.

actions/
Semua Server Actions.

lib/
Database dan helper.

validations/
Semua schema Zod.

types/
Semua interface dan type.

---

## UI Rules

- Mobile First.
- Tailwind Utility Only.
- shadcn/ui untuk komponen kompleks.
- Sonner untuk toast notification.
- AlertDialog untuk delete confirmation.

---

## Database Rules

- ID menggunakan CUID.
- createdAt otomatis now().
- updatedAt otomatis update.
- Jangan hard delete jika data penting (future: soft delete).

---

## Git Rules

Branch

main
production

dev
development

Feature Branch

feature/articles
feature/events
feature/gallery

Commit Format

feat:
fix:
refactor:
style:
docs:

Example

feat: add article CRUD
fix: update article validation
docs: create PRD and schema

---

## Code Quality Rules

- ESLint wajib bersih.
- Tidak boleh menggunakan any tanpa alasan.
- Semua form menggunakan validation.
- Semua async function menggunakan try/catch.
- Semua Server Action mengembalikan response yang jelas.

---

## Architecture Rules

Server Component
- Fetch database.
- Render data.

Client Component
- State.
- Modal.
- Dropdown.
- Toast.

Server Action
- Create.
- Update.
- Delete.
- Authentication.

---

## Responsive Rules

Priority:
1. Mobile.
2. Tablet.
3. Desktop.

Breakpoints

sm
md
lg
xl

Semua halaman wajib responsive.