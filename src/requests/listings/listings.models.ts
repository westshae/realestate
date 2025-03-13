interface Listings {
  id: string;
  date_scraped: string;
  active: boolean;
  sold_listing_id: string | null;
  item_id: string;
  property_id: string | null;
  listing_id: string | null;
  tm_ids: string[];
  branch_id: string | null;
  branch_ids: string[];
  state: number;
  sales_count: number;
  property_detail_id: string | null;
  point: string;
  display_price: string;
  price: string | null;
  date: string;
  url: string;
  featured_at: string;
  featured_plan: number;
  agent_id: string | null;
  agent_ids: string[];
  display_price_short: string;
  propertyEstimateHistory: string,
  propertySalesValuationHistory: string,
}

export type { Listings };