import { propertyDetails, branches, agents, cards } from "@/db/schema";
import { InferInsertModel } from "drizzle-orm";
import { getSchemaPropertyDetailsFromCard, getSchemaBranchesFromCard, getSchemaAgentFromCard, getSchemaCardFromCard } from "./property.map";
import { Card, MapItem } from "./property.models";
import { insertedOrExistingAgent, insertedOrExistingBranch, insertedOrExistingPropertyDetails, insertedOrExistingCard } from "./property.repos";



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
  } catch (error) {
    console.log("Failed to resolve property id for address:", formattedAddress);
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
  } catch (error) {
    return null;
  }
}

export const insertCardAndRelatedData = async (card: Card): Promise<void> => {
  if (!card.branches || card.branches.length === 0) {
    return;
  }

  const propertyDetailsToInsert: InferInsertModel<typeof propertyDetails> = getSchemaPropertyDetailsFromCard(card);
  const insertedPropertyDetailIds = await insertedOrExistingAgent(propertyDetailsToInsert);

  const branchToInsert: InferInsertModel<typeof branches> = getSchemaBranchesFromCard(card);
  const insertedBranchIds = await insertedOrExistingBranch(branchToInsert);

  if(insertedBranchIds.length === 0) {
    return;
  }

  const agentToInsert: InferInsertModel<typeof agents> = getSchemaAgentFromCard(card, insertedBranchIds[0].id);
  const insertedAgentIds = await insertedOrExistingPropertyDetails(agentToInsert);

  if(insertedAgentIds.length === 0) {
    return;
  }

  const cardToInsert: InferInsertModel<typeof cards> = getSchemaCardFromCard(card, insertedAgentIds[0].id);
  const insertedCardIds = await insertedOrExistingCard(cardToInsert);
}
