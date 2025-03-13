import { InferInsertModel } from "drizzle-orm";
import { getSchemaListing } from "./listings.map";
import { agents, branches, listings, propertyDetails } from "@/db/schema";
import { getPropertyPriceEstimateHistory, getPropertySaleValuationHistory } from "../bank/bank.services";
import { Listings } from "./listings.models";
import { Agent, Branch } from "../bank/bank.models";
import { insertedOrUpdatedAgent, insertedOrUpdatedBranch, insertedOrUpdatedPropertyDetails } from "../bank/bank.repos";
import { getSchemaPropertyDetailsFromCard, getSchemaBranchesFromCard, getSchemaAgentFromCard } from "../bank/bank.map";
import { insertListing } from "./listings.repos";
import { v4 as uuidv4 } from 'uuid';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getAgentListings = async (id: string): Promise<any | null> => {
  try {
    const response = await fetch(`https://gateway.homes.co.nz/agents/${id}/listings`);
    const text = await response.text();
    const parsed = JSON.parse(text);
    return parsed.cards;
  } catch {
    return null;
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const insertListingAndRelatedData = async (parsedListing: any): Promise<{ id: string; }[] | null> => {
  try {
    if (parsedListing.property_details) {
      const propertyDetailsToInsert: InferInsertModel<typeof propertyDetails> = getSchemaPropertyDetailsFromCard(parsedListing);
      await insertedOrUpdatedPropertyDetails(propertyDetailsToInsert);
    }

    let insertedBranchIds: { id: string }[] = [];
    if (parsedListing.branches && parsedListing.branches.length > 0) {
      const branchToInsert: InferInsertModel<typeof branches> = getSchemaBranchesFromCard(parsedListing);
      insertedBranchIds = await insertedOrUpdatedBranch(branchToInsert);
    }

    if (insertedBranchIds.length > 0) {
      const agentToInsert: InferInsertModel<typeof agents> = getSchemaAgentFromCard(parsedListing, insertedBranchIds[0].id);
      await insertedOrUpdatedAgent(agentToInsert);
    }

    const estimateHistory = await getPropertyPriceEstimateHistory(parsedListing.property_id)
    const salesValuationHistory = await getPropertySaleValuationHistory(parsedListing.property_id)
  
    const listing: Listings = {
      id: uuidv4(),
      date_scraped: new Date().toISOString(),
      item_id: parsedListing.item_id,
      active: true,
      sold_listing_id: null,
      property_id: parsedListing.property_id ? parsedListing.property_id : "",
      listing_id: parsedListing.listing_id,
      tm_ids: parsedListing.tm_ids,
      branch_id: parsedListing.branch_id ? parsedListing.branch_id : null,
      branch_ids: parsedListing.branches ? parsedListing.branches.map((branch: Branch) => branch.id) : [],
      state: parsedListing.state,
      sales_count: parsedListing.sales_count,
      property_detail_id: parsedListing.property_details ? parsedListing.property_details : null,
      point: parsedListing.point,
      display_price: parsedListing.display_price,
      price: parsedListing.price,
      date: parsedListing.date,
      featured_at: parsedListing.featured_at ? parsedListing.featured_at : null,
      featured_plan: parsedListing.featured_plan,
      agent_id: parsedListing.agent ? parsedListing.agent.id : null,
      url: parsedListing.url,
      agent_ids: parsedListing.agents ? parsedListing.agents.map((agent: Agent) => agent.id) : [],
      display_price_short: parsedListing.display_price_short,
      propertyEstimateHistory: estimateHistory ? JSON.stringify(estimateHistory) : "",
      propertySalesValuationHistory: salesValuationHistory ? JSON.stringify(salesValuationHistory) : ""
    };

    const listingSchema: InferInsertModel<typeof listings> = getSchemaListing(listing, estimateHistory, salesValuationHistory);
    return await insertListing(listingSchema);
  } catch {
    console.log("FAILED")
    return null;
  }
}
