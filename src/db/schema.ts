import { integer, numeric, pgTable, varchar } from "drizzle-orm/pg-core";

const ordersTable = pgTable("orders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  clientId: integer("client_id").notNull(),
  coffeeType: varchar("coffee_type", { length: 255 }).notNull(),
  milkType: varchar("milk_type", { length: 255 }).notNull(),
  sugarCount: integer("sugar_count").notNull(),
  stageNumber: integer("stage_number").notNull(),
  stageNotified: integer("stage_notified").notNull(),
  stageMessage: varchar("stage_message", { length: 255 }).notNull(),
});

const machinesTable = pgTable("machines", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  lat: numeric("lat", { precision: 9, scale: 6 }).notNull(),
  long: numeric("long", { precision: 9, scale: 6 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  version: integer("version").notNull(),
});


export { ordersTable, machinesTable };