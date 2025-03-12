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
  property_id: string;
  decade_built: number;
  building_construction: string;
  building_condition: string;
  floor_area: number;
  land_area: number;
  has_deck: boolean;
  view_type: string;
  view_scope: string;
  zone: any;
  trees: any;
  contour: string;
  mass_total_living_area: any;
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
  claim_id: any;
  claimed: boolean;
  user_events: any;
  display_estimated_lower_value: string;
  display_estimated_upper_value: string;
  display_estimated_value: string;
  display_estimated_rental_lower_value: string;
  display_estimated_rental_upper_value: string;
  building_site_coverage: any;
  mass_garage_freestanding: any;
  mass_garage_under_roof: any;
  solar: any;
  capital_value_digit: string;
  improvement_value_digit: string;
  land_value_digit: string;
  display_capital_value: string;
  display_improvement_value: string;
  display_land_value: string;
  image_urls: any;
  images: any;
  video_urls: any;
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

interface PropertyEstimateHistory {
  date: string;
  estimate: number;
  low_estimate: number;
  high_estimate: number;
  display_estimate: string;
  display_low_estimate: string;
  display_high_estimate: string;
}



export type { PropertyEstimateHistory, Branch, PropertyDetails, Agent, Point, Card, MapItem };