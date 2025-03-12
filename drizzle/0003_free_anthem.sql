CREATE TABLE "property_estimate_history" (
	"id" varchar PRIMARY KEY NOT NULL,
	"property_id" varchar,
	"date" timestamp,
	"estimate" integer,
	"low_estimate" integer,
	"high_estimate" integer,
	"display_estimate" text,
	"display_low_estimate" text,
	"display_high_estimate" text
);
