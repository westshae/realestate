import { db } from "@/db";
import { eq, InferInsertModel } from "drizzle-orm";
import { agents, branches, cards, propertyDetails } from "@/db/schema";

type PropertyDetailsInsert = InferInsertModel<typeof propertyDetails>;

export const insertedOrExistingPropertyDetails = async (propertyDetailsInsert: PropertyDetailsInsert): Promise<{ id: string }[]> => {
  //onConflict, the id is set to id, so no actual update is done, just returning the existing row as an ID.
  return await db.insert(propertyDetails).values(propertyDetailsInsert).onConflictDoUpdate({
    target: [propertyDetails.id], // The unique key that might cause conflict
    set: { id: propertyDetails.id } // No actual update, just returning the existing row
  }).returning({ id: propertyDetails.id });
}

export const updateExistingPropertyDetails = async (id: string, updates: Partial<PropertyDetailsInsert>): Promise<{ id: string }[]> => {
  return await db.update(propertyDetails).set(updates).where(eq(propertyDetails.id, id)).returning({ id: propertyDetails.id });
}

type BranchInsert = InferInsertModel<typeof branches>;

export const insertedOrExistingBranch = async (branch: BranchInsert): Promise<{ id: string }[]> => {
  return await db.insert(branches).values(branch).onConflictDoUpdate({
    target: [branches.id], // The unique key that might cause conflict
    set: { id: branches.id } // No actual update, just returning the existing row
  }).returning({ id: branches.id });
}

type AgentInsert = InferInsertModel<typeof agents>;

export const insertedOrExistingAgent = async (agent: AgentInsert): Promise<{ id: string }[]> => {
  return await db.insert(agents).values(agent).onConflictDoUpdate({
    target: [agents.id], // The unique key that might cause conflict
    set: { id: agents.id } // No actual update, just returning the existing row
  }).returning({ id: agents.id });
}

type CardInsert = InferInsertModel<typeof cards>;

export const insertedOrExistingCard = async (card: CardInsert): Promise<{ id: string }[]> => {
  return await db.insert(cards).values(card).onConflictDoUpdate({
    target: [cards.id], // The unique key that might cause conflict
    set: { id: cards.id } // No actual update, just returning the existing row
  }).returning({ id: cards.id });
}

export const updateCardsWithPropertyEstimateHistory = async (cardId: string, propertyEstimateHistory: JSON): Promise<{ id: string }[]> => {
  return await db.update(cards).set({ propertyEstimateHistory: propertyEstimateHistory }).where(eq(cards.id, cardId)).returning({id: cards.id});
}


export const updateCardsWithPropertySalesValuationHistory = async (cardId: string, propertySalesValuationHistory: JSON): Promise<{ id: string }[]> => {
  return await db.update(cards).set({ propertySalesValuationHistory: propertySalesValuationHistory }).where(eq(cards.id, cardId)).returning({id: cards.id});
}

export const insertedOrUpdatedPropertyDetails = async (propertyDetailsInsert: PropertyDetailsInsert): Promise<{ id: string }[]> => {
  return await db.insert(propertyDetails).values(propertyDetailsInsert).onConflictDoUpdate({
    target: [propertyDetails.id],
    set: propertyDetailsInsert
  }).returning({ id: propertyDetails.id });
}

export const insertedOrUpdatedBranch = async (branch: BranchInsert): Promise<{ id: string }[]> => {
  return await db.insert(branches).values(branch).onConflictDoUpdate({
    target: [branches.id],
    set: branch
  }).returning({ id: branches.id });
}

export const insertedOrUpdatedAgent = async (agent: AgentInsert): Promise<{ id: string }[]> => {
  return await db.insert(agents).values(agent).onConflictDoUpdate({
    target: [agents.id],
    set: agent
  }).returning({ id: agents.id });
}
