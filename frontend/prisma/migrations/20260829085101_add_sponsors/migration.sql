-- CreateTable
CREATE TABLE "sponsors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "websiteUrl" TEXT,
    "imageUrl" TEXT,
    "imagePath" TEXT,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sponsors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "sponsors_orderIndex_idx" ON "sponsors"("orderIndex");

