-- CreateEnum
CREATE TYPE "EventCategory" AS ENUM ('WORKSHOP', 'SEMINAR', 'WEBINAR', 'HACKATHON', 'COMPETITION');

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" "EventCategory" NOT NULL,
    "description" TEXT NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3),
    "venue" TEXT,
    "speaker" TEXT,
    "speakerRole" TEXT,
    "registrationUrl" TEXT,
    "registrationClosed" BOOLEAN NOT NULL DEFAULT false,
    "imageUrl" TEXT,
    "imagePath" TEXT,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "events_startsAt_idx" ON "events"("startsAt");
