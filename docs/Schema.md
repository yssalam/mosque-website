# CMS Masjid — Database Schema

## Database

Provider:
Neon PostgreSQL

ORM:
Prisma

---

## Article

|   Field   |       Type        |
|-----------|-------------------|
| id        | String (CUID)     |
| name      | String            |
| slug      | String Unique     |
| desc      | String            |
| imageURL  | String            |
| status    | Draft / Published |
| createdAt | DateTime          |
| updatedAt | DateTime          |

---

## Announcement

|   Field   |   Type    |
|-----------|-----------|
| id        | String    |
| title     | String    |
| content   | String    |
| createdAt | DateTime  |
| updatedAt | DateTime  |

---

## Event

|     Field     |   Type    |
|---------------|-----------|
| id            | String    |
| title         | String    |
| description   | String    |
| eventDate     | DateTime  |
| location      | String    |
| imageURL      | String    |
| createdAt     | DateTime  |

---

## Gallery

|   Field   |   Type    |
|-----------|-----------|
| id        | String    |
| title     | String    |
| imageURL  | String    |
| createdAt | DateTime  |

---

## MosqueProfile

| Field         | Type      |
|---------------|-----------|
| id            | String    |
| mosqueName    | String    |
| address       | String    |
| phone         | Number    |
| email         | String    |
| description   | String    |
| logoURL       | String    |
| mapURL        | String    |
| updatedAt     | DateTime  |

---

## AdminUser

| Field     | Type            |
|-----------|-----------------|
| id        |String           |
| name      | String          |
| email     | String Unique   |
| password  | String (Hashed) |
| role      | ADMIN           |
| createdAt | DateTime        |

---

## Future Schema

- Category.
- Donation.
- Prayer Schedule.
- Video Kajian.
- Contact Messages.