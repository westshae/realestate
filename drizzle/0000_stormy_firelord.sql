CREATE TABLE "agents" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" text,
	"role" text,
	"suburb_expert" boolean,
	"suburb_expert_location" text,
	"profile_image_url" text,
	"office_phone" text,
	"mobile_phone" text,
	"branch_id" varchar,
	"team" boolean,
	"canonical_url" text[],
	"detail" jsonb,
	"stats" jsonb,
	"sale_stats" jsonb,
	"testimonials" jsonb,
	"tm_member_id" text
);
--> statement-breakpoint
CREATE TABLE "branches" (
	"id" varchar PRIMARY KEY NOT NULL,
	"role" text,
	"banner_url" text,
	"branch_name" text,
	"brand_name" text,
	"banner_background_hex_colour" text,
	"logo_url" text,
	"legal_name" text,
	"phone" text,
	"canonical_url" text[],
	"rental_partnership" jsonb,
	"residential_partnership" jsonb,
	"tm_id" text,
	"detail" jsonb,
	"stats" jsonb
);
--> statement-breakpoint
CREATE TABLE "cards" (
	"id" varchar PRIMARY KEY NOT NULL,
	"item_id" text,
	"property_id" varchar,
	"listing_id" text,
	"tm_ids" text[],
	"branch_id" varchar,
	"state" integer,
	"sales_count" integer,
	"property_details" jsonb,
	"point" jsonb,
	"display_price" text,
	"price" jsonb,
	"date" timestamp,
	"featured_at" timestamp,
	"featured_plan" integer,
	"agent_id" varchar
);
--> statement-breakpoint
CREATE TABLE "points" (
	"id" varchar PRIMARY KEY NOT NULL,
	"lat" integer,
	"long" integer
);
--> statement-breakpoint
CREATE TABLE "property_details" (
	"id" varchar PRIMARY KEY NOT NULL,
	"address" text,
	"display_address" text,
	"cover_image_url" text,
	"cover_image_url_source" text,
	"listing_images" text[],
	"google_street_view_url" text,
	"num_bathrooms" integer,
	"num_bedrooms" integer,
	"num_car_spaces" integer,
	"latest_bedrooms" text,
	"latest_bathrooms" text,
	"latest_car_spaces" text,
	"latest_source" text,
	"headline" text,
	"estimated_value_revision_date" timestamp,
	"display_estimated_lower_value_short" text,
	"display_estimated_upper_value_short" text,
	"display_estimated_value_short" text,
	"estimated_rental_revision_date" timestamp,
	"display_estimated_rental_lower_value_short" text,
	"display_estimated_rental_upper_value_short" text,
	"estimated_rental_yield" text,
	"capital_value" integer,
	"improvement_value" integer,
	"land_value" integer,
	"display_capital_value_short" text,
	"display_improvement_value_short" text,
	"display_land_value_short" text,
	"current_revision_date" timestamp,
	"first_gas_enabled" boolean,
	"flags" jsonb,
	"city_id" integer,
	"suburb_id" integer,
	"tm_suburb_id" integer,
	"tm_region_id" integer,
	"tm_district_id" integer,
	"unit_identifier" jsonb,
	"street_number" text,
	"street_alpha" jsonb,
	"street" text,
	"suburb" text,
	"city" text,
	"ta" text
);
--> statement-breakpoint
ALTER TABLE "agents" ADD CONSTRAINT "agents_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cards" ADD CONSTRAINT "cards_property_id_property_details_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."property_details"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cards" ADD CONSTRAINT "cards_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cards" ADD CONSTRAINT "cards_agent_id_agents_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("id") ON DELETE no action ON UPDATE no action;