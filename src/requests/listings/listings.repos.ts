import { db } from "@/db";
import { InferInsertModel } from "drizzle-orm";
import { listings } from "@/db/schema";

type ListingInsert = Omit<InferInsertModel<typeof listings>, "versionId">;

export const insertListing = async (listing: ListingInsert): Promise<{ id: string }[]> => {
  return await db.insert(listings).values(listing).onConflictDoUpdate({
    target: [listings.id], // The unique key that might cause conflict
    set: { id: listings.id } // No actual update, just returning the existing row
  }).returning({ id: listings.id });
}