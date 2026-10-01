/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `events` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "endTime" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "speaker" TEXT,
ADD COLUMN     "startTime" TEXT NOT NULL,
ADD COLUMN     "status" "EventStatus" NOT NULL DEFAULT 'DRAFT',
ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "imageURL" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "events_slug_key" ON "events"("slug");
