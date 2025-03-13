import { InferInsertModel } from "drizzle-orm"
import { SoldProperty } from "./sold.models"
import { sold } from "@/db/schema"

export const getSchemaSold = (soldProperty: SoldProperty): InferInsertModel<typeof sold> => {
  return {
    id: soldProperty.id,
    propertyId: soldProperty.property_id,
    listingId: soldProperty.listing_id,
    saleType: soldProperty.sale_type,
    priceOn: soldProperty.price_on,
    price: soldProperty.price !== null ? soldProperty.price.toString() : null,
    displayPrice: soldProperty.display_price,
    canDisplaySalePrice: soldProperty.can_display_sale_price,
    councilConfirmed: soldProperty.council_confirmed,
    promotable: soldProperty.promotable,
    saleAgentsIds: soldProperty.sale_agents ? soldProperty.sale_agents.map((agent) => agent.agent_id) : [],
    saleBranchesIds: soldProperty.sale_branches ? soldProperty.sale_branches.map((branch) => branch.branch_id) : [],
    featured: soldProperty.featured,
  }
}
