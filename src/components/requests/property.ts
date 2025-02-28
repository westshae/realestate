import { db } from "@/db";
import { getFetchWithTor, postFetchWithTor } from "../lib/tor";
import { propertiesTable } from "@/db/schema";

const polyfills = [
  // "rze{Felqi`@?wrDfhD??vrDghD?",
  // "j}e{F}qvi`@?wrDfhD??vrDghD?",
  // "jff{Fyf{i`@?wrDfhD??vrDghD?",
  // "|zb{Fep~i`@?wrDfhD??vrDghD?",
  // "rzb{Fizxi`@?wrDhhD??vrDihD?",
  // "|xb{F{iti`@?wrDfhD??vrDghD?",
  // "z{b{F_boi`@?yrDhhD??xrDihD?",
  "zy_{Fygoi`@?wrDjhD??vrDkhD?",
  // "by_{Filti`@?wrDhhD??vrDihD?",
  // "l~_{Fagyi`@?wrDhhD??vrDihD?",
  // "`|_{Fa{}i`@?wrDhhD??vrDihD?",
  // "fz|zFkl~i`@?wrDjhD??vrDkhD?",
  // "`z|zFmewi`@?wrDjhD??vrDkhD?",
  // "`z|zFghri`@?wrDjhD??vrDkhD?",
  // "d||zFqfmi`@?wrDjhD??vrDkhD?",
  // "|s|zFewhi`@?yrDjhD??xrDkhD?",
  // "p~xzF_yei`@?wrDlhD??vrDmhD?",
  // "ndyzFejki`@?wrDlhD??vrDmhD?",
  // "leyzFs~oi`@?wrDlhD??vrDmhD?",
  // "`gyzFkati`@?yrDlhD??xrDmhD?",
  // "xutzFkzvi`@?wrDnhD??vrDohD?",
  // "`|tzFgmzi`@?wrDnhD??vrDohD?",
  // "f|tzFyqri`@?wrDnhD??vrDohD?",
  // "|lqzFatii`@?wrDphD??vrDqhD?",
  // "rpqzFq~wi`@?wrDnhD??vrDohD?",
  // "jpqzFox{i`@?wrDphD??vrDqhD?",
  // "roqzFs|_j`@?wrDnhD??vrDohD?",
  // "xlqzF}pcj`@?wrDphD??vrDqhD?",
  // "vrqzFkehj`@?wrDphD??vrDqhD?",
  // "twqzFwmlj`@?wrDphD??vrDqhD?",
  // "|~qzFaspj`@?wrDphD??vrDqhD?",
  // "zsszFsumj`@?wrDnhD??vrDohD?",
  // "~lwzFitnj`@?wrDlhD??vrDmhD?",
  // "jc{zFspmj`@?wrDjhD??vrDkhD?",
  // "ze~zFeikj`@?yrDhhD??xrDihD?",
  // "lavzFyasj`@?wrDlhD??vrDmhD?",
  // "t`qzF_}uj`@?yrDphD??xrDqhD?",
  // "vruzFs~uj`@?wrDlhD??vrDmhD?",
  // "~dzzFovvj`@?yrDjhD??xrDkhD?",
  // "ra~zFiwuj`@?wrDjhD??vrDkhD?",
  // "~myzFijxj`@?wrDlhD??vrDmhD?",
  // "jvwzF{i|j`@?wrDlhD??vrDmhD?",
  // "v{lzF}hgj`@?yrDphD??xrDqhD?",
  // "lbnzFcjkj`@?wrDphD??vrDqhD?",
  // "bmnzFyvpj`@?wrDphD??vrDqhD?",
  // "|nnzFqxuj`@?wrDphD??vrDqhD?",
  // "bpnzFa}zj`@?yrDphD??xrDqhD?",
  // "tejzFej{j`@?yrDrhD??xrDshD?",
  // "tejzFimtj`@?wrDrhD??vrDshD?",
  // "xfjzF_uoj`@?wrDrhD??vrDshD?",
  // "jhjzFqwjj`@?wrDrhD??vrDshD?",
  // "xegzFc~jj`@?wrDthD??vrDuhD?",
  // "jjgzFuyoj`@?wrDrhD??vrDshD?",
  // "zpgzFeptj`@?yrDthD??xrDuhD?",
  // "xxgzFojyj`@?wrDrhD??vrDshD?",
  // "~zgzFuo}j`@?yrDrhD??xrDshD?",
  // "jrdzFi{}j`@?wrDvhD??vrDwhD?",
  // "l{dzFizxj`@?yrDthD??xrDuhD?",
  // "p~dzF{{tj`@?wrDthD??vrDuhD?",
  // "dabzFwe{j`@?wrDvhD??vrDwhD?",
  // "~bbzFoj_k`@?wrDvhD??vrDwhD?",
  // "~bbzFaqck`@?yrDvhD??xrDwhD?",
  // "zlbzFk{gk`@?wrDvhD??vrDwhD?",
  // "~d_zFwxdk`@?y`DzwC??x`D{wC?",
  // "lf_zFwtik`@?{`DzwC??z`D{wC?",
  // "|q}yFqzmk`@?{`DzwC??z`D{wC?",
  // "no{yFsdqk`@?{`D|wC??z`D}wC?",
  // "rsxyFabtk`@?y`D|wC??x`D}wC?",
  // "tnvyFkfxk`@?{`D|wC??z`D}wC?",
  // "vbvyFu~rk`@?y`D~wC??x`D_xC?",
  // "v~szFq|vi`@?wrDnhD??vrDohD?",
  // "jqrzF{a{i`@?wrDphD??vrDqhD?",
  // "|lozFgn_j`@?wrDphD??vrDqhD?",
  // "lbnzFmqbj`@?yrDrhD??xrDshD?",
  // "b_kzFw}aj`@?yrDphD??xrDqhD?",
  // "~wlzF_m}i`@?wrDrhD??vrDshD?",
  // "n`pzF}yxi`@?yrDphD??xrDqhD?",
  // "r{rzF_fui`@?wrDphD??vrDqhD?",
  // "rznzFu|ti`@?wrDphD??vrDqhD?",
  // "dkmzF}tyi`@?gdE`yD??fdEayD?",
  // "fpkzFs{~i`@?gdEbyD??fdEcyD?",
  // "tzkzFgwyi`@?gdE`yD??fdEayD?",
  // "voizFiayi`@?gdEbyD??fdEcyD?",
  // "ddhzFok~i`@?gdEdyD??fdEeyD?",
  // "fqfzF_raj`@?gdEdyD??fdEeyD?",
  // "tybzFuqbj`@?gdEfyD??fdEgyD?",
  // "b~bzFwe~i`@?gdEfyD??fdEgyD?",
  // "fh`zF}v}i`@?edEfyD??ddEgyD?",
  // "zw_zF}ncj`@?edEhyD??ddEiyD?",
  // "`a~yFgyhj`@?edEhyD??ddEiyD?",
  // "xk}yFep}i`@?ogH~vG??ngH_wG?",
  // "dyxyFqq~i`@?koFbbF??joFcbF?",
  // "p~uyFy~ej`@?koFbbF??joFcbF?",
  // "xiqyF_fdj`@?koFfbF??joFgbF?",
  // "lvlyF_igj`@?koFhbF??joFibF?",
  // "j`jyFcvjj`@?koFjbF??joFkbF?",
  // "`c`yFiivj`@?koFnbF??joFobF?",
  // "h|xyFyfij`@?gmGh~F??fmGi~F?",
  // "`_wyFoxmj`@?gmGj~F??fmGk~F?",
  // "bxzyFabrj`@?gmGf~F??fmGg~F?",
  // "f|`yFmxrj`@?qiKltJ??piKmtJ?",
  // "zhwxFy|{j`@?ibJnoI??hbJooI?",
  // "|qrxFau{j`@?gbJroI??fbJsoI?",
  // "xukxFki~j`@?ibJxoI??hbJyoI?",
  // "l`qxF_dck`@?gbJtoI??fbJuoI?",
  // "z`jxFesdk`@?gbJzoI??fbJ{oI?",
  // "jwdxFwchk`@?gbJ~oI??fbJ_pI?",
  // "rhlxFcyjk`@?gbJvoI??fbJwoI?",
  // "vgbxFsxnk`@?gbJ`pI??fbJapI?",
  // "b`{wFucmk`@?ibJdpI??hbJepI?",
  // "lw{wFytuk`@?gbJfpI??fbJgpI?"
];

interface ResponsePoint {
  lat: number;
  long: number;
}

interface ResponseMapItem {
  item_id: string;
  id: string;
  state: number;
  price: number | null;
  point: ResponsePoint;
  url: string;
  featured_at: string;
  featured_plan: number;
  display_price_short: string;
  display_street_number: string;
}

interface ResponseMapPoints {
  map_items: ResponseMapItem[];
  hits: number;
  error: string;
}

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

export interface StorageProperty {
  id: string;
  listing_id: string | null;
  branch_id: string | null;
  price: number;
  url: string | null;
  lat: number;
  long: number;
  address: string | null;
  listing_images: string | null;
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

export const savePropertiesFromAllPolyfillsToDb = async () => {
  for (const polyfill of polyfills) {
    await savePropertiesFromPolyfillToDb(polyfill);
  }
}

const savePropertiesFromPolyfillToDb = async (polyfill: string) => {
  const mapPoints: ResponseMapPoints | null = await getMapPointsFromPolyfills(polyfill);
  if (!mapPoints) {
    console.log("Failed to fetch property ids for polyfill:" + polyfill);
    return;
  } else {
    console.log("Fetched property ids for polyfill:" + polyfill);
  }
  const mapItems: ResponseMapItem[] = mapPoints.map_items;

  for (const mapItem of mapItems) {
    const property = await getPropertyFromId(mapItem as ResponseMapItem);
    if (!property) {
      console.log("Failed to fetch property:" + mapItem.id);
      continue;
    }
    // console.log("Fetched property:", property);
    // const dbMappedProperty = 
    // await db.insert(propertiesTable).values(property).execute();
  }
}

// export const saveMapPointsToDb = async (ids: string[]) => {
//   const mappedNullProperties = ids.map(uuid => ({
//     uuid: uuid,
//     listingId: null,
//     branchId: null,
//     price: null,
//     url: null,
//     lat: null,
//     long: null,
//     address: null,
//     listing_images: null,
//     google_street_view_url: null,
//     num_bathrooms: null,
//     num_bedrooms: null,
//     num_car_spaces: null,
//     city: null,
//     suburb: null,
//     ta: null,
//     street: null,
//     street_number: null,
//     unit_identifier: null,
//   }));

//   const insertedOrders = await db
//   .insert(propertiesTable)
//   .values(mappedNullProperties)
//   .returning({ uuid: propertiesTable.uuid });

//   const uuids = insertedOrders.map(order => order.uuid);
//   return { uuids };
// }

const getMapPointsFromPolyfills = async (polyfill: string): Promise<ResponseMapPoints | null> => {
  try {
    const response = await postFetchWithTor(`https://gateway.homes.co.nz/map/dots`,
      {
        "polylines": [
          polyfill
        ],
        "limit": 6000,
        "display_rentals": false,
        "for_rent": true,
        "for_sale": true,
        "just_sold": true,
        "off_market": true
      }
    ) as any;

    const responseBody = (await response).responseBody as any;

    return responseBody;
  } catch (error) {
    console.error(`Failed to fetch properties for polyfill ${polyfill}:`, error);
    return null;
  }
}

const getPropertyFromId = async (mapItem: ResponseMapItem): Promise<StorageProperty> => {
  const storageProperty = {
    id: mapItem.id,
    listing_id: mapItem.item_id,
    branch_id: null,
    price: mapItem.price || 0,
    url: mapItem.url,
    lat: mapItem.point.lat,
    long: mapItem.point.long,
    address: null,
    listing_images: null,
    google_street_view_url: null,
    num_bathrooms: null,
    num_bedrooms: null,
    num_car_spaces: null,
    city: null,
    suburb: null,
    ta: null,
    street: null,
    street_number: null,
    unit_identifier: null
  } as StorageProperty;

  try {//Gets property-specific data and adds it to the storageProperty object
    const splitUrl = mapItem.url.split("/");
    const splitStreet = splitUrl[3].split("-").join("%20");
    const splitSuburb = splitUrl[2].split("-").join("%20");
    const splitCity = splitUrl[1].split("-").join("%20");
    const formattedAddress = `${splitStreet},%20${splitSuburb},%20${splitCity}`;
    const resolverResponse = await getFetchWithTor(`https://gateway.homes.co.nz/property/resolve?address=${formattedAddress}&lat=${mapItem.point.lat}&long=${mapItem.point.long}`);
    const resolverResponseBody: { property_id: string, error: string } = await resolverResponse.json() as  { property_id: string, error: string };
    if(resolverResponseBody.error) {
      console.log("Failed to resolve property id for address:", formattedAddress);
      return storageProperty;
    }
    storageProperty.id = resolverResponseBody.property_id
    storageProperty.listing_id = resolverResponseBody.property_id;

    const response = await getFetchWithTor(`https://gateway.homes.co.nz/properties?property_ids=${storageProperty.id}`) as any;
    const textResponse = await response.text();
    const parsedResponse = JSON.parse(textResponse);
    const card = parsedResponse.cards[0] as ResponseCard;
    console.log("card", card);

    storageProperty.address = card.property_details.address;
    storageProperty.price = card.price;
    storageProperty.branch_id = card.branch_id;
    storageProperty.listing_images = card.property_details.listing_images;
    storageProperty.google_street_view_url = card.property_details.google_street_view_url;
    storageProperty.num_bathrooms = card.property_details.num_bathrooms;
    storageProperty.num_bedrooms = card.property_details.num_bedrooms;
    storageProperty.num_car_spaces = card.property_details.num_car_spaces;
    storageProperty.city = card.property_details.city;
    storageProperty.suburb = card.property_details.suburb;
    storageProperty.ta = card.property_details.ta;
    storageProperty.street = card.property_details.street;
    storageProperty.street_number = card.property_details.street_number;
    storageProperty.unit_identifier = card.property_details.unit_identifier;
  } catch (error) {}

  return storageProperty;
}