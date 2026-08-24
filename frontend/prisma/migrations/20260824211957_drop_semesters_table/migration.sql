-- DropForeignKey
ALTER TABLE "panel_members" DROP CONSTRAINT "panel_members_semesterId_fkey";

-- DropIndex
DROP INDEX "panel_members_semesterId_idx";

-- AlterTable
ALTER TABLE "panel_members" DROP COLUMN "semesterId";

-- DropTable
DROP TABLE "semesters";
