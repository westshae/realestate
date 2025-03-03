import { polyfills } from "./polyfill";
import { MapItem, Card } from "./property.models";
import { getMapItemsFromPolyfills, getProperty, insertCardAndRelatedData } from "./property.services";

export const savePropertiesFromAllPolyfillsToDb = async () => {
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
      } else {
        const delay = Math.random() * 100 + 300;
        await new Promise(resolve => setTimeout(resolve, delay));
      }

      const insertedCardIds = await insertCardAndRelatedData(card);
      if(insertedCardIds) {
        console.log(`${map_item_count} of ${mapItems.length}: ${card.property_details.display_address}`);
        inserted_card_count++;
      } else {
        const delay = Math.random() * 100 + 300;
        await new Promise(resolve => setTimeout(resolve, delay));
      }

      // // Add a random delay between 0.1 to .4 seconds
      // const delay = Math.random() * 100 + 300;
      // await new Promise(resolve => setTimeout(resolve, delay));
    }
    const polyfillSuccessMessage = `Inserted ${inserted_card_count} of ${map_item_count} map items for polyfill ${polyfill}`;
    console.log(polyfillSuccessMessage);
    polyfillSuccessMessages.push(polyfillSuccessMessage);
    totalAttemptedSaves += map_item_count;
    totalSuccessfulSaves += inserted_card_count;
  }

  for (const message of polyfillSuccessMessages) {
    console.log(message);
  }
  console.log(`Total successful:attempted saves: ${totalAttemptedSaves}:${totalSuccessfulSaves}`);
}
