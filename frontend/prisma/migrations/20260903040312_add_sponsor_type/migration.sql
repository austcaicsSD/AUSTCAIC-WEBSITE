-- CreateEnum
CREATE TYPE "SponsorType" AS ENUM ('GOLD_PARTNER', 'SILVER_PARTNER', 'ACADEMIC_PARTNER', 'MEDIA_SPONSOR');

-- AlterTable
ALTER TABLE "sponsors" ADD COLUMN     "type" "SponsorType" NOT NULL;

