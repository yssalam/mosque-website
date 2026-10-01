/*
  Warnings:

  - You are about to drop the column `title` on the `galleries` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "galleries" DROP COLUMN "title",
ADD COLUMN     "articleId" TEXT,
ADD COLUMN     "caption" TEXT,
ADD COLUMN     "eventId" TEXT;

-- CreateIndex
CREATE INDEX "galleries_articleId_idx" ON "galleries"("articleId");

-- CreateIndex
CREATE INDEX "galleries_eventId_idx" ON "galleries"("eventId");

-- AddForeignKey
ALTER TABLE "galleries" ADD CONSTRAINT "galleries_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "galleries" ADD CONSTRAINT "galleries_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;
