DROP TABLE "property_estimate_history" CASCADE;--> statement-breakpoint
ALTER TABLE "cards" ADD COLUMN "property_estimate_history" jsonb;