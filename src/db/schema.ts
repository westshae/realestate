import { integer, numeric, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

const agentsTable = pgTable("agents", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
});

const salesTable = pgTable("sales", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  agentId: integer("agent_id").notNull().references(() => agentsTable.id),
  propertyId: integer("property_id").notNull(),
  saleDate: varchar("sale_date", { length: 255 }).notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
});

const branchesTable = pgTable("branches", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  managerId: integer("manager_id").notNull().references(() => agentsTable.id),
});

const propertiesTable = pgTable("properties", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  uuid: uuid().notNull().unique(),
  listingId: varchar("listing_id", { length: 255 }),
  branchId: integer("branch_id").references(() => branchesTable.id),
  price: numeric("price", { precision: 10, scale: 2 }),
  url: varchar("url", { length: 255 }),
  lat: numeric("lat", { precision: 10, scale: 6 }),
  long: numeric("long", { precision: 10, scale: 6 }),
  address: varchar("address", { length: 255 }),
  listingImages: varchar("listing_images", { length: 255 }).array(),
  googleStreetViewUrl: varchar("google_street_view_url", { length: 255 }),
  numBathrooms: integer("num_bathrooms"),
  numBedrooms: integer("num_bedrooms"),
  numCarSpaces: integer("num_car_spaces"),
  city: varchar("city", { length: 255 }),
  suburb: varchar("suburb", { length: 255 }),
  ta: varchar("ta", { length: 255 }),
  street: varchar("street", { length: 255 }),
  streetNumber: varchar("street_number", { length: 255 }),
  unitIdentifier: varchar("unit_identifier", { length: 255 }),
});

export { agentsTable, salesTable, branchesTable, propertiesTable };