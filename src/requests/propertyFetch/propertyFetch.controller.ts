import { cards, propertyDetails } from "@/db/schema";
import { polyfills } from "./polyfill";
import { MapItem, Card, PropertyDetails } from "./propertyFetch.models";
import { getMapItemsFromPolyfills, getProperty, getPropertyDetails, getPropertyPriceEstimateHistory, insertCardAndRelatedData } from "./propertyFetch.services";
import { db } from "@/db";
import { getSchemaPropertyDetailsFromPropertyDetails } from "./propertyFetch.map";
import { InferInsertModel } from "drizzle-orm";
import { updateCardsWithPropertyEstimateHistory, updateExistingPropertyDetails } from "./propertyFetch.repos";

export const getAllPropertyPriceEstimationHistory = async () => {
  if (!process.env.LOCAL) {
    return;
  }
  const ids = (await db.select({ id: cards.propertyId }).from(cards)).map(card => card.id);
  const totalIds = ids.length;
  let successIds = 0;
  for (const id of ids) {
    try {
      if(!id) {
        continue;
      }
      const estimateHistory: JSON | null = await Promise.race<JSON | null>([
        getPropertyPriceEstimateHistory(id),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 5000))
      ]);

      

      const delay = Math.random() * 100 + 150;
      await new Promise(resolve => setTimeout(resolve, delay));

      if (!estimateHistory) {
        console.log("estimateHistories lack failure")
        continue;
      }
      updateCardsWithPropertyEstimateHistory(id, estimateHistory);

      successIds++;
      console.log("Id updated: ", id, ":", successIds, ":", totalIds);

    } catch (error) {
      const delay = Math.random() * 1000 + 3000;
      await new Promise(resolve => setTimeout(resolve, delay));
      continue;
    }
  }

}

export const updateAllPropertyDetailsToDb = async () => {
  if (!process.env.LOCAL) {
    return;
  }
  const ids = (await db.select({ id: cards.propertyId }).from(cards)).map(card => card.id);
  const totalIds = ids.length;
  let successIds = 0;
  for (const id of ids) {
    try {
      if(!id) {
        continue;
      }
      const details: PropertyDetails | null = await Promise.race<PropertyDetails | null>([
        getPropertyDetails(id),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 5000))
      ]);

      

      const delay = Math.random() * 100 + 150;
      await new Promise(resolve => setTimeout(resolve, delay));

      if (!details) {
        console.log("details lack failure")
        continue;
      }
      const propertyDetailsToInsert: InferInsertModel<typeof propertyDetails> = getSchemaPropertyDetailsFromPropertyDetails(id, details);
      updateExistingPropertyDetails(id, propertyDetailsToInsert);
      successIds++;
      console.log("Id updated: ", id, ":", successIds, ":", totalIds);
    } catch (error) {
      const delay = Math.random() * 1000 + 3000;
      await new Promise(resolve => setTimeout(resolve, delay));
      continue;
    }
  }
}

export const savePropertiesFromAllPolyfillsToDb = async () => {
  if (!process.env.LOCAL) {
    return;
  }
  const polyfillSuccessMessages = [];
  let totalAttemptedSaves = 0;
  let totalSuccessfulSaves = 0;
  for (const polyfill of polyfills) {

    const mapItems: MapItem[] = await getMapItemsFromPolyfills(polyfill);

    let map_item_count = 0;
    let inserted_card_count = 0;
    for (const mapItem of mapItems) {
      map_item_count++;
      const card: Card | null = await getProperty(mapItem as MapItem);
      if (!card) {
        console.log("Failed to fetch card:" + mapItem.id);
        continue;
      }

      try {
        const insertedCardIds = await Promise.race([
          insertCardAndRelatedData(card),
          new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 5000))
        ]);
        if (insertedCardIds) {
          console.log(`${map_item_count} of ${mapItems.length}: ${card.property_details.display_address}`);
          inserted_card_count++;
        }

        // Add a random delay between 0.1 to .4 seconds
        // const delayPoint4Second = Math.random() * 1000;
        const delay = Math.random() * 100 + 150;
        await new Promise(resolve => setTimeout(resolve, delay));
      } catch (error) {
        console.log("Timeout error for card:" + card.property_details.display_address);
        continue;
      }
    }
    const polyfillSuccessMessage = `Inserted ${inserted_card_count} of ${map_item_count} map items for polyfill ${polyfill}`;
    console.log(polyfillSuccessMessage)
    console.log(polyfillSuccessMessage);
    polyfillSuccessMessages.push(polyfillSuccessMessage);
    totalAttemptedSaves += map_item_count;
    totalSuccessfulSaves += inserted_card_count;
    const delay4second = Math.random() * 1000 + 3000;
    await new Promise(resolve => setTimeout(resolve, delay4second));

  }

  for (const message of polyfillSuccessMessages) {
    console.log(message);
  }
  console.log(`Total successful:attempted saves: ${totalAttemptedSaves}:${totalSuccessfulSaves}`);
}
