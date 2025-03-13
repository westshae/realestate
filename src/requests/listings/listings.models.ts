interface Listings {
  id: string;
  date_scraped: string;
  active: boolean;
  sold_listing_id: string | null;
  item_id: string;
  property_id: string;
  listing_id: string;
  tm_ids: string[];
  branch_id: string;
  branch_ids: string[];
  state: number;
  sales_count: number;
  property_detail_id: string;
  point: string;
  display_price: string;
  price: string | null;
  date: string;
  url: string;
  featured_at: string;
  featured_plan: number;
  agent_id: string;
  agent_ids: string[];
  display_price_short: string;
  propertyEstimateHistory: string,
  propertySalesValuationHistory: string,
}

export type { Listings };