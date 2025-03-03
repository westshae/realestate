// import { integer, numeric, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

// const agentsTable = pgTable("agents", {
//   id: integer().primaryKey().generatedAlwaysAsIdentity(),
//   name: varchar("name", { length: 255 }).notNull(),
//   email: varchar("email", { length: 255 }).notNull(),
//   phone: varchar("phone", { length: 20 }).notNull(),
// });

// const salesTable = pgTable("sales", {
//   id: integer().primaryKey().generatedAlwaysAsIdentity(),
//   agentId: integer("agent_id").notNull().references(() => agentsTable.id),
//   propertyId: integer("property_id").notNull(),
//   saleDate: varchar("sale_date", { length: 255 }).notNull(),
//   amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
// });

// const branchesTable = pgTable("branches", {
//   id: integer().primaryKey().generatedAlwaysAsIdentity(),
//   name: varchar("name", { length: 255 }).notNull(),
//   location: varchar("location", { length: 255 }).notNull(),
//   managerId: integer("manager_id").notNull().references(() => agentsTable.id),
// });

// const propertiesTable = pgTable("properties", {
//   id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
//   uuid: uuid().notNull().unique(),
//   listingId: varchar("listing_id", { length: 255 }),
//   branchId: integer("branch_id").references(() => branchesTable.id),
//   price: numeric("price", { precision: 10, scale: 2 }),
//   url: varchar("url", { length: 255 }),
//   lat: numeric("lat", { precision: 10, scale: 6 }),
//   long: numeric("long", { precision: 10, scale: 6 }),
//   address: varchar("address", { length: 255 }),
//   listingImages: varchar("listing_images", { length: 255 }).array(),
//   googleStreetViewUrl: varchar("google_street_view_url", { length: 255 }),
//   numBathrooms: integer("num_bathrooms"),
//   numBedrooms: integer("num_bedrooms"),
//   numCarSpaces: integer("num_car_spaces"),
//   city: varchar("city", { length: 255 }),
//   suburb: varchar("suburb", { length: 255 }),
//   ta: varchar("ta", { length: 255 }),
//   street: varchar("street", { length: 255 }),
//   streetNumber: varchar("street_number", { length: 255 }),
//   unitIdentifier: varchar("unit_identifier", { length: 255 }),
// });

// export { agentsTable, salesTable, branchesTable, propertiesTable };

import { pgTable, varchar, text, integer, boolean, jsonb, primaryKey, PgArray, timestamp } from "drizzle-orm/pg-core";

// Branch Table
export const branches = pgTable("branches", {
  id: varchar("id").primaryKey(),
  role: text("role"),
  bannerUrl: text("banner_url"),
  branchName: text("branch_name"),
  brandName: text("brand_name"),
  bannerBackgroundHexColour: text("banner_background_hex_colour"),
  logoUrl: text("logo_url"),
  legalName: text("legal_name"),
  phone: text("phone"),
  canonicalUrl: text("canonical_url").array(),
  rentalPartnership: jsonb("rental_partnership"),
  residentialPartnership: jsonb("residential_partnership"),
  tmId: text("tm_id"),
  detail: jsonb("detail"),
  stats: jsonb("stats"),
});

// PropertyDetails Table
export const propertyDetails = pgTable("property_details", {
  id: varchar("id").primaryKey(),
  address: text("address"),
  displayAddress: text("display_address"),
  coverImageUrl: text("cover_image_url"),
  coverImageUrlSource: text("cover_image_url_source"),
  listingImages: text("listing_images").array(),
  googleStreetViewUrl: text("google_street_view_url"),
  numBathrooms: integer("num_bathrooms"),
  numBedrooms: integer("num_bedrooms"),
  numCarSpaces: integer("num_car_spaces"),
  latestBedrooms: text("latest_bedrooms"),
  latestBathrooms: text("latest_bathrooms"),
  latestCarSpaces: text("latest_car_spaces"),
  latestSource: text("latest_source"),
  headline: text("headline"),
  estimatedValueRevisionDate: timestamp("estimated_value_revision_date"),
  displayEstimatedLowerValueShort: text("display_estimated_lower_value_short"),
  displayEstimatedUpperValueShort: text("display_estimated_upper_value_short"),
  displayEstimatedValueShort: text("display_estimated_value_short"),
  estimatedRentalRevisionDate: timestamp("estimated_rental_revision_date"),
  displayEstimatedRentalLowerValueShort: text("display_estimated_rental_lower_value_short"),
  displayEstimatedRentalUpperValueShort: text("display_estimated_rental_upper_value_short"),
  estimatedRentalYield: text("estimated_rental_yield"),
  capitalValue: integer("capital_value"),
  improvementValue: integer("improvement_value"),
  landValue: integer("land_value"),
  displayCapitalValueShort: text("display_capital_value_short"),
  displayImprovementValueShort: text("display_improvement_value_short"),
  displayLandValueShort: text("display_land_value_short"),
  currentRevisionDate: timestamp("current_revision_date"),
  firstGasEnabled: boolean("first_gas_enabled"),
  flags: jsonb("flags"),
  cityId: integer("city_id"),
  suburbId: integer("suburb_id"),
  tmSuburbId: integer("tm_suburb_id"),
  tmRegionId: integer("tm_region_id"),
  tmDistrictId: integer("tm_district_id"),
  unitIdentifier: jsonb("unit_identifier"),
  streetNumber: text("street_number"),
  streetAlpha: jsonb("street_alpha"),
  street: text("street"),
  suburb: text("suburb"),
  city: text("city"),
  ta: text("ta"),
});

// Agent Table
export const agents = pgTable("agents", {
  id: varchar("id").primaryKey(),
  name: text("name"),
  role: text("role"),
  suburbExpert: boolean("suburb_expert"),
  suburbExpertLocation: text("suburb_expert_location"),
  profileImageUrl: text("profile_image_url"),
  officePhone: text("office_phone"),
  mobilePhone: text("mobile_phone"),
  branchId: varchar("branch_id").references(() => branches.id),
  team: boolean("team"),
  canonicalUrl: text("canonical_url").array(),
  detail: jsonb("detail"),
  stats: jsonb("stats"),
  saleStats: jsonb("sale_stats"),
  testimonials: jsonb("testimonials"),
  tmMemberId: text("tm_member_id"),
});

// Point Table
export const points = pgTable("points", {
  id: varchar("id").primaryKey(),
  lat: integer("lat"),
  long: integer("long"),
});

// Card Table
export const cards = pgTable("cards", {
  id: varchar("id").primaryKey(),
  itemId: text("item_id"),
  propertyId: varchar("property_id").references(() => propertyDetails.id),
  listingId: text("listing_id"),
  tmIds: text("tm_ids").array(),
  branchId: varchar("branch_id").references(() => branches.id),
  state: integer("state"),
  salesCount: integer("sales_count"),
  propertyDetails: jsonb("property_details"),
  point: jsonb("point"),
  displayPrice: text("display_price"),
  price: jsonb("price"),
  date: timestamp("date"),
  featuredAt: timestamp("featured_at"),
  featuredPlan: integer("featured_plan"),
  agentId: varchar("agent_id").references(() => agents.id),
});
