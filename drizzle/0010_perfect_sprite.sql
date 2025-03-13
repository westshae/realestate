CREATE TABLE "sold" (
	"id" integer PRIMARY KEY NOT NULL,
	"property_id" varchar,
	"listing_id" varchar,
	"sale_type" text,
	"price_on" text,
	"price" text,
	"display_price" text,
	"can_display_sale_price" boolean,
	"council_confirmed" boolean,
	"promotable" boolean,
	"sale_agents_ids" text[],
	"sale_branches_ids" text[],
	"featured" jsonb
);
