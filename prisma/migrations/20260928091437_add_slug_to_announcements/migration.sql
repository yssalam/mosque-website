/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `announcements` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `announcements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "announcements" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "announcements_slug_key" ON "announcements"("slug");
