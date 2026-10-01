#  CMS Masjid

Website CMS Masjid yang digunakan untuk mengelola informasi dan konten Masjid secara terpusat, sekaligus menyediakan halaman publik untuk jamaah dan masyarakat.

Project ini dibuat sebagai fullstack web application menggunakan Next.js, TypeScript, PostgreSQL, Prisma, dan Supabase Storage.

# LIVE DEMO

https://mosque-website-15d5nni4s-yogas-projects-f31813f4.vercel.app/

## Admin CMS

Email:
admin@masjid.com

Password:
admin12345

#  Features

##  Public Website

- Informasi profil Masjid
- Visi dan misi
- Sejarah Masjid
- Alamat dan lokasi Masjid
- Informasi kontak
- Jam operasional
- Jadwal shalat
- Artikel / berita Masjid
- Detail artikel berdasarkan slug
- Agenda / event kegiatan
- Detail event berdasarkan slug
- Gallery kegiatan
- Gallery lightbox
- Responsive design untuk mobile, tablet, dan desktop

##  CMS Dashboard

- Authentication admin
- Dashboard management
- Kelola profil Masjid
- Kelola artikel
- Kelola event / agenda
- Kelola gallery
- Upload gambar
- Edit dan hapus content
- Status content:
  - Draft
  - Published
  - Active
  - Inactive

## Image Management

Upload gambar dilakukan melalui CMS dan disimpan menggunakan Supabase Storage.

Mendukung:

- JPG
- PNG
- WEBP
- Maximum file size: 5 MB

---

# Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React
- React Hook Form
- Zod

## Backend

- Next.js Server Actions
- Next.js Route Handlers
- Prisma ORM

## Database

- PostgreSQL
- Neon

## Storage

- Supabase Storage

## Deployment

- Vercel

---

# Architecture

Project menggunakan pendekatan server-first dengan Next.js App Router.

```
textBrowser
   │
   ▼
Next.js App Router
   │
   ├── Public Website
   │      │
   │      └── Server Components
   │
   ├── CMS Dashboard
   │      │
   │      ├── Client Components
   │      └── Server Actions
   │
   ├── API Routes
   │      │
   │      └── Image Upload
   │
   └── Prisma
          │
          ▼
      PostgreSQL
         Neon
          
Image Upload
     │
     ▼
Supabase Storage