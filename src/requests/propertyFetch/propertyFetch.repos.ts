import { db } from "@/db";
import { eq, InferInsertModel } from "drizzle-orm";
import { agents, branches, cards, propertyDetails } from "@/db/schema";

type PropertyDetailsInsert = InferInsertModel<typeof propertyDetails>;

export const insertedOrExistingPropertyDetails = async (propertyDetailsInsert: PropertyDetailsInsert) => {
  //onConflict, the id is set to id, so no actual update is done, just returning the existing row as an ID.
  return await db.insert(propertyDetails).values(propertyDetailsInsert).onConflictDoUpdate({
    target: [propertyDetails.id], // The unique key that might cause conflict
    set: {id: propertyDetails.id} // No actual update, just returning the existing row
  }).returning({ id: propertyDetails.id });
}

export const updateExistingPropertyDetails = async (id: string, updates: Partial<PropertyDetailsInsert>) => {
  return await db.update(propertyDetails).set(updates).where(eq(propertyDetails.id, id)).returning();
}

type BranchInsert = InferInsertModel<typeof branches>;

export const insertedOrExistingBranch = async (branch: BranchInsert) => {
    return await db.insert(branches).values(branch).onConflictDoUpdate({
      target: [branches.id], // The unique key that might cause conflict
      set: {id: branches.id} // No actual update, just returning the existing row
    }).returning({ id: branches.id });
}

type AgentInsert = InferInsertModel<typeof agents>;

export const insertedOrExistingAgent = async (agent: AgentInsert) => {
  return await db.insert(agents).values(agent).onConflictDoUpdate({
    target: [agents.id], // The unique key that might cause conflict
    set: {id: agents.id} // No actual update, just returning the existing row
  }).returning({ id: agents.id });
}

type CardInsert = InferInsertModel<typeof agents>;

export const insertedOrExistingCard = async (card: CardInsert) => {
  return await db.insert(cards).values(card).onConflictDoUpdate({
    target: [cards.id], // The unique key that might cause conflict
    set: {id: cards.id} // No actual update, just returning the existing row
  }).returning({ id: cards.id });
}

export const updateCardsWithPropertyEstimateHistory = async (cardId: string, propertyEstimateHistory: JSON) => {
  return await db.update(cards).set({ propertyEstimateHistory: propertyEstimateHistory }).where(eq(cards.id, cardId)).returning();
}