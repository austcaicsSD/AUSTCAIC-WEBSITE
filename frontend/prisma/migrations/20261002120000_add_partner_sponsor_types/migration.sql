-- AlterEnum (additive only; GOLD_PARTNER / SILVER_PARTNER are kept in the
-- database but no longer offered in the app)
ALTER TYPE "SponsorType" ADD VALUE 'STRATEGIC_PARTNER';
ALTER TYPE "SponsorType" ADD VALUE 'COMMUNITY_PARTNER';
ALTER TYPE "SponsorType" ADD VALUE 'EVENT_PARTNER';
