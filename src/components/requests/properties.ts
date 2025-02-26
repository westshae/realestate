import { ConsoleLogWriter } from "drizzle-orm";
import { getFetchWithTor } from "../lib/tor";
import { getAllPropertyIdsFromExternal } from "./propertyids";

interface ResponsePropertyDetails {
  address: string;
  display_address: string;
  cover_image_url: string;
  cover_image_url_source: string;
  listing_images: string | null;
  google_street_view_url: string;
  num_bathrooms: number;
  num_bedrooms: number;
  num_car_spaces: number | null;
  latest_bedrooms: string | null;
  latest_bathrooms: string | null;
  latest_car_spaces: string | null;
  latest_source: string;
  headline: string | null;
  estimated_value_revision_date: string;
  display_estimated_lower_value_short: string;
  display_estimated_upper_value_short: string;
  display_estimated_value_short: string;
  estimated_rental_revision_date: string | null;
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
  flags: {
    deprivation_index?: string;
    dot_sa1?: string;
    dot_segment?: string;
    estimate_model_release_date: string;
    estimate_model_version: string;
    first_gas: string;
    sky: string;
    ultra_fast_fiber: string;
  };
  city_id: number;
  suburb_id: number;
  tm_suburb_id: number;
  tm_region_id: number;
  tm_district_id: number;
  unit_identifier: string | null;
  street_number: string;
  street_alpha: string | null;
  street: string;
  suburb: string;
  city: string;
  ta: string;
}

interface ResponsePoint {
  lat: number;
  long: number;
}

interface ResponseSolar {
  image_url: string | null;
  estimate: string;
  potential: string;
}

interface ResponseCard {
  id: string;
  item_id: string;
  property_id: string;
  listing_id: string;
  tm_ids: string[] | null;
  branch_id: string | null;
  branch: string | null;
  branches: string | null;
  state: number;
  sales_count: number;
  property_details: ResponsePropertyDetails;
  point: ResponsePoint;
  display_price: string | null;
  price: number;
  date: string | null;
  featured_at: string | null;
  featured_plan: string | null;
  agent: string | null;
  agents: string | null;
  url: string;
  distance_to_point: string | null;
  display_price_short: string;
  solar: ResponseSolar | null;
  featured_sale: string | null;
  valuation_update_events: string | null;
  user_events: Record<string, unknown>;
}

export interface StorageProperties {
  id: string;
  listing_id: string | null;
  branch_id: string | null;
  price: number;
  url: string | null;
  address: string | null;
  listing_images: string[] | null;
  google_street_view_url: string | null;
  num_bathrooms: number | null;
  num_bedrooms: number | null;
  num_car_spaces: number | null;
  city: string | null;
  suburb: string | null;
  ta: string | null;
  street: string | null;
  street_number: string | null;
  unit_identifier: string | null;
}

export const getPropertiesFromIds = async (ids: string[]): Promise<any | null> => {
  try {
    const concatIds = ids.join(',');
    const response = await getFetchWithTor(`https://gateway.homes.co.nz/properties?property_ids=${concatIds}`) as any;

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch properties for polyfill ${ids.join(',')}:`, error);
    return null;
  }
}

export const getAllPropertyDataFromExternal = async (): Promise<StorageProperties[]> => {
  const results: StorageProperties[] = [];

  const propertyIds = await getAllPropertyIdsFromExternal();

  for (const id of propertyIds) {
    const response = await getPropertiesFromIds([id]) as any;
    if (response && response.cards && response.cards.length > 0) {
      for (const card of response.cards) {
        if (!card) {
          continue;
        }
        const property: StorageProperties = {
          id: card.id,
          listing_id: card.listing_id ? card.listing_id : null,
          branch_id: card.branch_id ? card.branch_id : null,
          price: card.price,
          url: card.url ? card.url : null,
          address: card.property_details ? card.property_details.address : null,
          listing_images: card.property_details && card.property_details.listing_images ? card.property_details.listing_images : null,
          google_street_view_url: card.property_details ? card.property_details.google_street_view_url : null,
          num_bathrooms: card.property_details ? card.property_details.num_bathrooms : null,
          num_bedrooms: card.property_details ? card.property_details.num_bedrooms : null,
          num_car_spaces: card.property_details ? card.property_details.num_car_spaces : null,
          city: card.property_details ? card.property_details.city : null,
          suburb: card.property_details ? card.property_details.suburb : null,
          ta: card.property_details ? card.property_details.ta : null,
          street: card.property_details ? card.property_details.street : null,
          street_number: card.property_details ? card.property_details.street_number : null,
          unit_identifier: card.property_details ? card.property_details.unit_identifier : null,
        };
        results.push(property);
      };
    }
  }

  return results;
}
