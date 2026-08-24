-- AlterTable
ALTER TABLE "panel_members" ADD COLUMN     "imagePath" TEXT,
ADD COLUMN     "semesterId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "semesters" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "semesters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "semesters_slug_key" ON "semesters"("slug");

-- CreateIndex
CREATE INDEX "panel_members_semester_orderIndex_idx" ON "panel_members"("semester", "orderIndex");

-- CreateIndex
CREATE INDEX "panel_members_semesterId_idx" ON "panel_members"("semesterId");

-- AddForeignKey
ALTER TABLE "panel_members" ADD CONSTRAINT "panel_members_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "semesters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

