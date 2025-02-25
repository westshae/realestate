import { integer, numeric, pgTable, varchar } from "drizzle-orm/pg-core";

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

export { agentsTable, salesTable, branchesTable };