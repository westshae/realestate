import { agents, branches, cards, propertyDetails } from "@/db/schema";
import { InferInsertModel } from "drizzle-orm";
import { Card } from "./property.models";

export const getSchemaPropertyDetailsFromCard = (card: Card): InferInsertModel<typeof propertyDetails> => {
  return {
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
}

export const getSchemaBranchesFromCard = (card: Card): InferInsertModel<typeof branches> => {
  return {
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
    ;
}

export const getSchemaAgentFromCard = (card: Card, branchId: string): InferInsertModel<typeof agents> => {
  return {
    id: card.agent.id,
    name: card.agent.name,
    role: card.agent.role,
    suburbExpert: card.agent.suburb_expert,
    suburbExpertLocation: card.agent.suburb_expert_location,
    profileImageUrl: card.agent.profile_image_url,
    officePhone: card.agent.office_phone,
    mobilePhone: card.agent.mobile_phone,
    branchId: branchId,
    team: card.agent.team,
    canonicalUrl: card.agent.canonical_url,
    detail: card.agent.detail,
    stats: card.agent.stats,
    saleStats: card.agent.sale_stats,
    testimonials: card.agent.testimonials,
    tmMemberId: card.agent.tm_member_id,
  }
}

export const getSchemaCardFromCard = (card: Card, propertyDetailId: string): InferInsertModel<typeof cards> => {
  return {
    id: card.id,
    itemId: card.item_id,
    propertyId: propertyDetailId,
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
}