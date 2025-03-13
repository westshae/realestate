import { db } from "@/db";
import { agents } from "@/db/schema";
import { getAgentListings, insertListingAndRelatedData } from "./listings.services";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getAllAgentListingsAndUpdateDB = async () => {
  if (!process.env.LOCAL) {
    return;
  }
  const ids = (await db.select({ id: agents.id }).from(agents)).map(agent => agent.id);
  const totalIds = ids.length;
  let successIds = 0;
  for (const id of ids) {
    try {
      if(!id) {
        continue;
      }
      const listings: any | null = await Promise.race<any | null>([
        getAgentListings(id),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 5000))
      ]);

      const delay = Math.random() * 100 + 150;
      await new Promise(resolve => setTimeout(resolve, delay));

      if (!listings) {
        console.log("details lack failure")
        continue;
      }

      let individualListingSuccessCount = 0;
      for (const listing of listings) {
        try {
          await insertListingAndRelatedData(listing);
          individualListingSuccessCount++;
        } catch {
          continue;
        }
      }
      successIds++;
      console.log("Agent listings: ", id, ":", successIds, "/", totalIds, ":IndividualListingSuccessesOnCurrentTry", individualListingSuccessCount, "/", listings.length);
    } catch {
      const delay = Math.random() * 1000 + 3000;
      await new Promise(resolve => setTimeout(resolve, delay));
      continue;
    }
  }
}
