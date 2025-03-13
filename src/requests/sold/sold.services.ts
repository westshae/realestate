import { InferInsertModel } from "drizzle-orm";
import { SoldProperty } from "./sold.models";
import { insertSoldBatch } from "./sold.repos";
import { sold } from "@/db/schema";

export const getEverySaleInExistence = async (id: string): Promise<SoldProperty[] | null> => {
  try {
    const response = await fetch(`https://gateway.homes.co.nz/agents/${id}/sales?limit=3000&page=1`);
    const text = await response.text();
    const parsed = JSON.parse(text);
    return parsed.sales as SoldProperty[];
  } catch {
    return null;
  }
}

export const getRecentSales = async (id: string): Promise<SoldProperty[] | null> => {
  try {
    const response = await fetch(`https://gateway.homes.co.nz/agents/${id}/sales?limit=100&page=1`);
    const text = await response.text();
    const parsed = JSON.parse(text);
    return parsed.sales as SoldProperty[];
  } catch {
    return null;
  }
}

export const insertSoldProperties = async (soldProperties: SoldProperty[]): Promise<void> => {
  try {
    const soldPropertiesToInsert: InferInsertModel<typeof sold>[] = soldProperties.map((property) => ({
      id: property.id,
      propertyId: property.property_id,
      listingId: property.listing_id,
      saleType: property.sale_type,
      priceOn: property.price_on,
      price: property.price !== null ? property.price.toString() : null,
      displayPrice: property.display_price,
      canDisplaySalePrice: property.can_display_sale_price,
      councilConfirmed: property.council_confirmed,
      promotable: property.promotable,
      saleAgentsIds: property.sale_agents ? property.sale_agents.map((agent) => agent.agent_id) : [],
      saleBranchesIds: property.sale_branches ? property.sale_branches.map((branch) => branch.branch_id) : [],
      featured: property.featured,
    }));

    await insertSoldBatch(soldPropertiesToInsert);
  } catch (error) {
    console.error(error)
    console.log("FAILED")
    return;
  }
}
