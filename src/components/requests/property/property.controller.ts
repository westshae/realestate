import { polyfills } from "./polyfill";
import { MapItem, Card } from "./property.models";
import { getMapItemsFromPolyfills, getProperty, insertCardAndRelatedData } from "./property.services";

export const savePropertiesFromAllPolyfillsToDb = async () => {
  for (const polyfill of polyfills) {
    const mapItems: MapItem[] = await getMapItemsFromPolyfills(polyfill);

    let count = 0;
    for (const mapItem of mapItems) {
      count++;
      const card: Card | null = await getProperty(mapItem as MapItem);
      if (!card) {
        console.log("Failed to fetch card:" + mapItem.id);
        continue;
      }
  
      await insertCardAndRelatedData(card);
      console.log(`${count} of ${mapItems.length}: ${card.property_details.display_address}`);
    }
  
  }
}
