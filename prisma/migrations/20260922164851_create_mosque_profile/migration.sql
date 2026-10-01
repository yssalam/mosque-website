-- CreateTable
CREATE TABLE "mosque_profile" (
    "id" TEXT NOT NULL,
    "mosqueName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logoURL" TEXT NOT NULL,
    "mapURL" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mosque_profile_pkey" PRIMARY KEY ("id")
);
