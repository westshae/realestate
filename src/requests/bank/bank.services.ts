import { propertyDetails, branches, agents, cards } from "@/db/schema";
import { InferInsertModel } from "drizzle-orm";
import { getSchemaPropertyDetailsFromCard, getSchemaBranchesFromCard, getSchemaAgentFromCard, getSchemaCardFromCard } from "./bank.map";
import { Card, MapItem, PropertyDetails } from "./bank.models";
import { insertedOrExistingAgent, insertedOrExistingBranch, insertedOrExistingPropertyDetails, insertedOrExistingCard } from "./bank.repos";



export const getMapItemsFromPolyfills = async (polyfill: string): Promise<MapItem[]> => {
  try {
    const response = await fetch(`https://gateway.homes.co.nz/map/dots`, {
      method: 'POST',
      body: JSON.stringify({
        "polylines": [
          polyfill
        ],
        "limit": 6000,
        "display_rentals": false,
        "for_rent": true,
        "for_sale": true,
        "just_sold": true,
        "off_market": true
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    return (await (await response).json()).map_items;
  } catch (error) {
    console.error(`Failed to fetch properties for polyfill ${polyfill}:`, error);
    return [];
  }
}

const formatUrlForSearch = (url: string) => {
  const splitUrl = url.split("/");
  const splitStreet = splitUrl[3].split("-").join("%20");
  const splitSuburb = splitUrl[2].split("-").join("%20");
  const splitCity = splitUrl[1].split("-").join("%20");
  const formattedAddress = `${splitStreet},%20${splitSuburb},%20${splitCity}`;
  return formattedAddress;
}

const getPropertyIdFromAddress = async (formattedAddress: string, lat: number, long: number) => {
  try {
    const resolverResponse = await fetch(`https://gateway.homes.co.nz/property/resolve?address=${formattedAddress}&lat=${lat}&long=${long}`);

    const resolverResponseBody: { property_id: string, error: string } = await resolverResponse.json() as { property_id: string, error: string };
    return resolverResponseBody.property_id;
  } catch {
    console.error("Failed to resolve property id for address:", formattedAddress);
    return null;
  }
}

export const getPropertyDetails = async (id: string): Promise<PropertyDetails | null> => {
  try {
    const response = await fetch(`https://api-gateway.homes.co.nz/details?property_id=${id}`);
    const text = await response.text();
    return JSON.parse(text).property as PropertyDetails;
  } catch {
    return null;
  }
} 

export const getPropertyPriceEstimateHistory = async (id: string): Promise<JSON | null> => {
  try {
    const response = await fetch(`https://gateway.homes.co.nz/estimate/history/${id}`);
    const text = await response.text();
    return JSON.parse(text);
  } catch {
    return null;
  }
} 

export const getPropertySaleValuationHistory = async (id: string): Promise<JSON | null> => {
  try {
    const response = await fetch(`https://gateway.homes.co.nz/property/${id}/timeline`);
    const text = await response.text();
    return JSON.parse(text);
  } catch {
    return null;
  }
} 


export const getProperty = async (mapItem: MapItem): Promise<Card | null> => {
  try {
    const formattedAddressForSearch = formatUrlForSearch(mapItem.url);
    const propertyId = await getPropertyIdFromAddress(formattedAddressForSearch, mapItem.point.lat, mapItem.point.long);

    if (!propertyId) {
      return null;
    }

    const response = await fetch(`https://gateway.homes.co.nz/properties?property_ids=${propertyId}`);
    const text = await response.text();

    return JSON.parse(text).cards[0] as Card;
  } catch {
    return null;
  }
}

export const insertCardAndRelatedData = async (card: Card): Promise<{ id: string; }[] | null> => {
  try {
    let insertedPropertyDetailIds: { id: string; }[] = [];
    if (card.property_details) {
      const propertyDetailsToInsert: InferInsertModel<typeof propertyDetails> = getSchemaPropertyDetailsFromCard(card);
      insertedPropertyDetailIds = await insertedOrExistingPropertyDetails(propertyDetailsToInsert);
    }

    let insertedBranchIds: {id: string}[] = [];
    if (card.branches && card.branches.length > 0) {
      const branchToInsert: InferInsertModel<typeof branches> = getSchemaBranchesFromCard(card);
      insertedBranchIds = await insertedOrExistingBranch(branchToInsert);
    }

    if (insertedBranchIds.length > 0) {
      const agentToInsert: InferInsertModel<typeof agents> = getSchemaAgentFromCard(card, insertedBranchIds[0].id);
      await insertedOrExistingAgent(agentToInsert);
    }

    const cardToInsert: InferInsertModel<typeof cards> = getSchemaCardFromCard(card, insertedPropertyDetailIds[0].id);
    const insertedCardIds = await insertedOrExistingCard(cardToInsert);

    return insertedCardIds;
  } catch {
    console.log("FAILED")
    return null;
  }
}
