import { db } from "@/db";
import { agents, branches, cards, propertyDetails } from "@/db/schema";
import { InferInsertModel, eq } from 'drizzle-orm';
import { polyfills } from "./property/polyfill";
import { Card, MapItem } from "./property/property.models";
const fs = require('fs');

const getProperty = async (mapItem: MapItem): Promise<Card | null> => {
  try {//Gets property-specific data and adds it to the storageProperty object
    const splitUrl = mapItem.url.split("/");
    const splitStreet = splitUrl[3].split("-").join("%20");
    const splitSuburb = splitUrl[2].split("-").join("%20");
    const splitCity = splitUrl[1].split("-").join("%20");
    const formattedAddress = `${splitStreet},%20${splitSuburb},%20${splitCity}`;
    const resolverResponse = await fetch(`https://gateway.homes.co.nz/property/resolve?address=${formattedAddress}&lat=${mapItem.point.lat}&long=${mapItem.point.long}`);
    const resolverResponseBody: { property_id: string, error: string } = await resolverResponse.json() as { property_id: string, error: string };
    if (resolverResponseBody.error) {
      console.log("Failed to resolve property id for address:", formattedAddress);
      return null;
    }

    const response = await fetch(`https://gateway.homes.co.nz/properties?property_ids=${resolverResponseBody.property_id}`);
    const text = await response.text();
    const parsedResponse = JSON.parse(text);
    return parsedResponse.cards[0] as Card;
  } catch (error) {
    return null;
  }
}

const getMapPointsFromPolyfills = async (polyfill: string): Promise<MapItem[]> => {
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

    const responseJson = await (await response).json();
    return responseJson.map_items;
  } catch (error) {
    console.error(`Failed to fetch properties for polyfill ${polyfill}:`, error);
    return [];
  }
}

const insertCardAndRelatedData = async (card: Card) => {
  const propertyDetailsToInsert: InferInsertModel<typeof propertyDetails> = {
    id: card.item_id,
    address: card.property_details.address,
    displayAddress: card.property_details.display_address,
    coverImageUrl: card.property_details.cover_image_url,
    coverImageUrlSource: card.property_details.cover_image_url_source,
    listingImages: card.property_details.listing_images,
    googleStreetViewUrl: card.property_details.google_street_view_url,
    numBathrooms: card.property_details.num_bathrooms,
    numBedrooms: card.property_details.num_bedrooms,
    numCarSpaces: card.property_details.num_car_spaces,
    latestBedrooms: card.property_details.latest_bedrooms,
    latestBathrooms: card.property_details.latest_bathrooms,
    latestCarSpaces: card.property_details.latest_car_spaces,
    latestSource: card.property_details.latest_source,
    headline: card.property_details.headline,
    estimatedValueRevisionDate: new Date(card.property_details.estimated_value_revision_date),
    displayEstimatedLowerValueShort: card.property_details.display_estimated_lower_value_short,
    displayEstimatedUpperValueShort: card.property_details.display_estimated_upper_value_short,
    displayEstimatedValueShort: card.property_details.display_estimated_value_short,
    estimatedRentalRevisionDate: new Date(card.property_details.estimated_rental_revision_date),
    displayEstimatedRentalLowerValueShort: card.property_details.display_estimated_rental_lower_value_short,
    displayEstimatedRentalUpperValueShort: card.property_details.display_estimated_rental_upper_value_short,
    estimatedRentalYield: card.property_details.estimated_rental_yield,
    capitalValue: card.property_details.capital_value,
    improvementValue: card.property_details.improvement_value,
    landValue: card.property_details.land_value,
    displayCapitalValueShort: card.property_details.display_capital_value_short,
    displayImprovementValueShort: card.property_details.display_improvement_value_short,
    displayLandValueShort: card.property_details.display_land_value_short,
    currentRevisionDate: new Date(card.property_details.current_revision_date),
    firstGasEnabled: card.property_details.first_gas_enabled,
    flags: card.property_details.flags,
    cityId: card.property_details.city_id,
    suburbId: card.property_details.suburb_id,
    tmSuburbId: card.property_details.tm_suburb_id,
    tmRegionId: card.property_details.tm_region_id,
    tmDistrictId: card.property_details.tm_district_id,
    unitIdentifier: card.property_details.unit_identifier,
    streetNumber: card.property_details.street_number,
    streetAlpha: card.property_details.street_alpha,
    street: card.property_details.street,
    suburb: card.property_details.suburb,
    city: card.property_details.city,
    ta: card.property_details.ta,
  };

  const existingProperty = await db.select().from(propertyDetails).where(eq(propertyDetails.id, propertyDetailsToInsert.id)).limit(1);
  let insertedPropertyDetails;
  if (existingProperty.length === 0) {
    insertedPropertyDetails = await db.insert(propertyDetails).values(propertyDetailsToInsert).returning({ id: propertyDetails.id });
  } else {
    insertedPropertyDetails = existingProperty;
  }
  if (!card.branches || card.branches.length === 0) {
    return;
  }
  const branchToInsert: InferInsertModel<typeof branches> = {
    id: card.branches[0].id,
    role: card.branches[0].role,
    bannerUrl: card.branches[0].banner_url,
    branchName: card.branches[0].branch_name,
    brandName: card.branches[0].brand_name,
    bannerBackgroundHexColour: card.branches[0].banner_background_hex_colour,
    logoUrl: card.branches[0].logo_url,
    legalName: card.branches[0].legal_name,
    phone: card.branches[0].phone,
    canonicalUrl: card.branches[0].canonical_url,
    rentalPartnership: card.branches[0].rental_partnership,
    residentialPartnership: card.branches[0].residential_partnership,
    tmId: card.branches[0].tm_id,
    detail: card.branches[0].detail,
    stats: card.branches[0].stats,
  }

  const existingBranch = await db.select().from(branches).where(eq(branches.id, branchToInsert.id)).limit(1);
  let insertedBranch;
  if (existingBranch.length === 0) {
    insertedBranch = await db.insert(branches).values(branchToInsert).returning({ id: branches.id });
  } else {
    insertedBranch = existingBranch;
  }


  const agentToInsert: InferInsertModel<typeof agents> = {
    id: card.agent.id,
    name: card.agent.name,
    role: card.agent.role,
    suburbExpert: card.agent.suburb_expert,
    suburbExpertLocation: card.agent.suburb_expert_location,
    profileImageUrl: card.agent.profile_image_url,
    officePhone: card.agent.office_phone,
    mobilePhone: card.agent.mobile_phone,
    branchId: insertedBranch[0].id,
    team: card.agent.team,
    canonicalUrl: card.agent.canonical_url,
    detail: card.agent.detail,
    stats: card.agent.stats,
    saleStats: card.agent.sale_stats,
    testimonials: card.agent.testimonials,
    tmMemberId: card.agent.tm_member_id,
  }
  const existingAgent = await db.select().from(agents).where(eq(agents.id, agentToInsert.id)).limit(1);
  let insertedAgent;
  if (existingAgent.length === 0) {
    insertedAgent = await db.insert(agents).values(agentToInsert).returning({ id: agents.id });
  } else {
    insertedAgent = existingAgent;
  }

  const cardToInsert: InferInsertModel<typeof cards> = {
    id: card.id,
    itemId: card.item_id,
    propertyId: insertedPropertyDetails[0].id,
    listingId: card.listing_id,
    tmIds: card.tm_ids,
    branchId: card.branch_id,
    state: card.state,
    salesCount: card.sales_count,
    propertyDetails: card.property_details,
    point: card.point,
    displayPrice: card.display_price,
    price: card.price,
    date: new Date(card.date),
    featuredAt: new Date(card.featured_at),
    featuredPlan: card.featured_plan,
    agentId: card.agent.id,
  };
  const existingCard = await db.select().from(cards).where(eq(cards.id, cardToInsert.id)).limit(1);
  let insertedCard;
  if (existingCard.length === 0) {
    insertedCard = await db.insert(cards).values(cardToInsert).returning({ id: cards.id });
  } else {
    insertedCard = existingCard;
  }
  return insertedCard;
}

const savePropertiesFromPolyfillToDb = async (polyfill: string) => {
  const mapItems: MapItem[] = await getMapPointsFromPolyfills(polyfill);

  let count = 0;
  for (const mapItem of mapItems) {
    count++;
    const card: Card | null = await getProperty(mapItem as MapItem);
    if (!card) {
      console.log("Failed to fetch card:" + mapItem.id);
      const logMessage = `Failed to fetch card: ${mapItem.id}\n`;
      fs.appendFileSync('error.log', logMessage);
      continue;
    }

    await insertCardAndRelatedData(card);
    console.log(`${count} of ${mapItems.length}: ${card.property_details.display_address}`);
  }
}

export const savePropertiesFromAllPolyfillsToDb = async () => {
  for (const polyfill of polyfills) {
    await savePropertiesFromPolyfillToDb(polyfill);
  }
}
