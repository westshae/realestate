interface Branch {
  id: string;
  role: string;
  banner_url: string;
  branch_name: string;
  brand_name: string;
  banner_background_hex_colour: string;
  logo_url: string;
  legal_name: string;
  phone: string;
  canonical_url: string[];
  rental_partnership: any;
  residential_partnership: any;
  tm_id: string;
  detail: any;
  stats: any;
}

interface PropertyDetails {
  address: string;
  display_address: string;
  cover_image_url: string;
  cover_image_url_source: string;
  listing_images: string[];
  google_street_view_url: string;
  num_bathrooms: number;
  num_bedrooms: number;
  num_car_spaces: number;
  latest_bedrooms: string;
  latest_bathrooms: string;
  latest_car_spaces: string;
  latest_source: string;
  headline: string;
  estimated_value_revision_date: string;
  display_estimated_lower_value_short: string;
  display_estimated_upper_value_short: string;
  display_estimated_value_short: string;
  estimated_rental_revision_date: string;
  display_estimated_rental_lower_value_short: string;
  display_estimated_rental_upper_value_short: string;
  estimated_rental_yield: string;
  capital_value: number;
  improvement_value: number;
  land_value: number;
  display_capital_value_short: string;
  display_improvement_value_short: string;
  display_land_value_short: string;
  current_revision_date: string;
  first_gas_enabled: boolean;
  flags: Record<string, string>;
  city_id: number;
  suburb_id: number;
  tm_suburb_id: number;
  tm_region_id: number;
  tm_district_id: number;
  unit_identifier: any;
  street_number: string;
  street_alpha: any;
  street: string;
  suburb: string;
  city: string;
  ta: string;
}

interface Agent {
  id: string;
  name: string;
  role: string;
  suburb_expert: boolean;
  suburb_expert_location: string;
  profile_image_url: string;
  office_phone: string;
  mobile_phone: string;
  branch_id: string;
  branch: Branch;
  team: boolean;
  canonical_url: string[];
  detail: any;
  stats: Record<string, number>;
  sale_stats: Record<string, any>;
  testimonials: any;
  tm_member_id: string;
}

interface Point {
  lat: number;
  long: number;
}

interface Card {
  id: string;
  item_id: string;
  property_id: string;
  listing_id: string;
  tm_ids: string[];
  branch_id: string;
  branch: Branch | null;
  branches: Branch[];
  state: number;
  sales_count: number;
  property_details: PropertyDetails;
  point: Point;
  display_price: string;
  price: any;
  date: string;
  featured_at: string;
  featured_plan: number;
  agent: Agent;
  agents: Agent[];
}

interface MapItem {
  item_id: string;
  id: string;
  state: number;
  price: number;
  point: Point;
  url: string;
  featured_at: string | null;
  featured_plan: number | null;
  display_price_short: string;
  display_street_number: string;
}



export type { Branch, PropertyDetails, Agent, Point, Card, MapItem };