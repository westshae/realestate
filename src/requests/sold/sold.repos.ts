import { sold } from "@/db/schema";
import { db } from "@/db";
import { InferInsertModel } from "drizzle-orm";

export const insertSoldBatch = async (soldProperties: InferInsertModel<typeof sold>[]): Promise<{ id: number }[]> => {
  if (soldProperties.length === 0) {
    return [];
  }
  return await db.insert(sold).values(soldProperties).onConflictDoNothing().returning({ id: sold.id });
}