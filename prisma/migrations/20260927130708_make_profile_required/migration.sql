-- AlterTable
ALTER TABLE "mosque_profile" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "heroImageURL" TEXT,
ADD COLUMN     "mission" TEXT,
ADD COLUMN     "operationalHours" TEXT,
ADD COLUMN     "shortHistory" TEXT,
ADD COLUMN     "vision" TEXT;
