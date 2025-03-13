import { listings } from "@/db/schema"
import { InferInsertModel } from "drizzle-orm"
import { Listings } from "./listings.models"

export const getSchemaListing = (listing: Listings, estimate_history: JSON | null, sales_valuation_history: JSON | null): InferInsertModel<typeof listings> => {
  return {
    id: listing.id,
    dateScraped: listing.date_scraped ? new Date(listing.date_scraped) : null,
    active: listing.active,
    soldListingId: listing.sold_listing_id,
    itemId: listing.item_id,
    propertyId: listing.property_id,
    listingId: listing.listing_id,
    tmIds: listing.tm_ids,
    branchId: listing.branch_id,
    branchIds: listing.branch_ids,
    state: listing.state,
    salesCount: listing.sales_count,
    propertyDetailId: listing.property_detail_id,
    point: listing.point,
    displayPrice: listing.display_price,
    price: listing.price,
    date: listing.date ? new Date(listing.date) : null,
    featuredAt: listing.featured_at ? new Date(listing.featured_at) : null,
    featuredPlan: listing.featured_plan,
    agentId: listing.agent_id,
    agentIds: listing.agent_ids,
    displayPriceShort: listing.display_price_short,
    propertyEstimateHistory: estimate_history,
    propertySalesValuationHistory: sales_valuation_history,
    url: listing.url
  }
}
