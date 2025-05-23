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
  rental_partnership: string;
  residential_partnership: string;
  tm_id: string;
  detail: string;
  stats: string;
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
  unit_identifier: string;
  street_number: string;
  street_alpha: string;
  street: string;
  suburb: string;
  city: string;
  ta: string;
  property_id: string;
  decade_built: number;
  building_construction: string;
  building_condition: string;
  floor_area: number;
  land_area: number;
  has_deck: boolean;
  view_type: string;
  view_scope: string;
  zone: string;
  trees: string;
  contour: string;
  mass_total_living_area: string;
  legal_description: string;
  category_code: string;
  certificate_of_title: string;
  valuation_reference_number: string;
  land_use: string;
  estimated_lower_value: number;
  estimated_upper_value: number;
  estimated_value: number;
  estimated_rental_lower_value: number;
  estimated_rental_upper_value: number;
  bath_estimate: number;
  bath_estimate_date: string;
  bed_estimate: number;
  bed_estimate_date: string;
  suburb_name: string;
  city_name: string;
  claim_id: string;
  claimed: boolean;
  user_events: string;
  display_estimated_lower_value: string;
  display_estimated_upper_value: string;
  display_estimated_value: string;
  display_estimated_rental_lower_value: string;
  display_estimated_rental_upper_value: string;
  building_site_coverage: string;
  mass_garage_freestanding: string;
  mass_garage_under_roof: string;
  solar: string;
  capital_value_digit: string;
  improvement_value_digit: string;
  land_value_digit: string;
  display_capital_value: string;
  display_improvement_value: string;
  display_land_value: string;
  image_urls: string;
  images: string;
  video_urls: string;
  core_logic_id: number;
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
  detail: string;
  stats: Record<string, number>;
  sale_stats: Record<string, string>;
  testimonials: string;
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
  price: string;
  date: string;
  featured_at: string;
  featured_plan: number;
  agent: Agent;
  agents: Agent[];
  propertyEstimateHistory: string;
  propertySalesValuationHistory: string;
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