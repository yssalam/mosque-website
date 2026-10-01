-- CreateEnum
CREATE TYPE "AnnouncementStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "announcements" ADD COLUMN     "imageURL" TEXT,
ADD COLUMN     "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "AnnouncementStatus" NOT NULL DEFAULT 'ACTIVE';
