import { db } from "@/db";
import { agents } from "@/db/schema";
import { getRecentSales, insertSoldProperties } from "./sold.services";

export const saveOneAgentSales = async () => {
  const getOneAgent = await db.select({ id: agents.id }).from(agents).limit(1);
  const id = getOneAgent[0].id;
  const sales = await getRecentSales(id);
  if (!sales) {
    return;
  }
  const response = await insertSoldProperties(sales);
  return response;
}

export const saveAllAgentsSales = async (): Promise<void> => {
  const ids = (await db.select({ id: agents.id }).from(agents)).map(agent => agent.id);
  let count = 0;
  for (const id of ids) {
    try {
      count++;
      if (!id) {
        continue;
      }
      const sales = await getRecentSales(id);
      if (!sales) {
        continue;
      }
      await insertSoldProperties(sales);

      const delay = Math.random() * 100 + 150;
      await new Promise(resolve => setTimeout(resolve, delay));

      console.log("Agent sales: ", id, ":", count, "/", ids.length);
    } catch {
      const delay = Math.random() * 1000 + 3000;
      await new Promise(resolve => setTimeout(resolve, delay));
      continue;
    }
  }
}