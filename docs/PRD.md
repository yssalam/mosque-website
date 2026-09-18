# CMS Masjid — Product Requirements Document (PRD)

## Project Overview

CMS Masjid adalah aplikasi Content Management System untuk membantu pengurus masjid mengelola informasi masjid melalui dashboard admin.

Website publik akan menampilkan informasi yang dikelola melalui CMS.

---

## Objectives

- Mempermudah pengurus mengelola konten masjid.
- Menyediakan dashboard admin yang sederhana dan responsif.
- Menjadi project fullstack modern menggunakan Next.js dan PostgreSQL.

---

## Target Users

### Admin
- Login ke dashboard.
- Mengelola artikel.
- Mengelola agenda kegiatan.
- Mengelola pengumuman.
- Mengelola galeri.
- Mengelola profil masjid.

### Pengunjung
- Melihat artikel.
- Melihat agenda.
- Melihat galeri.
- Melihat profil masjid.
- Melihat pengumuman.

---

## MVP Features (Version 1)

### Authentication
- Login Admin.
- Logout Admin.
- Protected Dashboard.

### Dashboard
- Statistik sederhana.
- Jumlah artikel.
- Jumlah agenda.
- Jumlah galeri.

### Article Management
- Create Article.
- Read Article.
- Update Article.
- Delete Article.
- Search.
- Pagination.

### Announcement
- CRUD Pengumuman.

### Event Management
- CRUD Agenda Masjid.

### Gallery
- CRUD Foto.
- Upload Thumbnail.

### Mosque Profile
- Nama Masjid.
- Alamat.
- Nomor Telepon.
- Deskripsi.
- Google Maps.
- Logo.

---

## Non Functional Requirements

- Responsive Mobile First.
- Fast Loading.
- SEO Friendly.
- Clean UI.
- Type Safe.
- Accessible.

---

## Tech Stack

|     Layer     |      Technology       |
|---------------|-----------------------|
| Frontend      | Next.js 16 App Router |
| Language      | TypeScript            |
| Styling       | Tailwind CSS          |
| Database      | Neon PostgreSQL       |
| ORM           | Prisma 7              |
| Deployment    | Vercel                |
| Validation    | Zod                   |
| Form          | React Hook Form       |
| Notification  | Sonner                |
| UI Component  | shadcn/ui             |

---

## Success Criteria

- Admin dapat mengelola semua konten.
- Semua CRUD berjalan.
- Website publik otomatis menampilkan data terbaru.