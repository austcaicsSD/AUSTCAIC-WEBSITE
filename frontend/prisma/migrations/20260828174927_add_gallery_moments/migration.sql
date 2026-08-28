-- CreateTable
CREATE TABLE "gallery_moments" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "momentDate" TIMESTAMP(3) NOT NULL,
    "imageUrl" TEXT,
    "imagePath" TEXT,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gallery_moments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "gallery_moments_momentDate_idx" ON "gallery_moments"("momentDate");

