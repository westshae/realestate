import { getFetchWithTor } from "../lib/tor";
import { getAllAgentsFromExternal } from "./agents";

interface ResponseSaleAgent {
  agent_id: string;
  branch_id: string | null;
  role: number;
  created_at: string;
  agent: any;
}

interface ResponseSaleBranch {
  branch_id: string;
  created_at: string;
  branch: any;
}

interface ResponseFeatured {
  start_at: string | null;
  end_at: string | null;
  variant: string | null;
  highlights: string | null;
}

interface ResponseSale {
  id: number;
  property_id: string;
  listing_id: string;
  sale_type: string;
  price_on: string;
  price: number | null;
  display_price: string;
  can_display_sale_price: boolean;
  council_confirmed: boolean;
  promotable: boolean;
  sale_agents: ResponseSaleAgent[];
  sale_branches: ResponseSaleBranch[];
  featured: ResponseFeatured;
}

interface ResponseAgentSales {
  sales: ResponseSale[];
  error: string;
}

export interface StorageSale {
  id: number;
  property_id: string;
  listing_id: string;
  sale_type: string;
  price_on: string;
  price: number | null;
  branch_id: string | null;
  agent_id: string;
}

export const convertSaleResponseToStorage = (sale: ResponseSale): StorageSale => {
  return {
    id: sale.id,
    property_id: sale.property_id,
    listing_id: sale.listing_id,
    sale_type: sale.sale_type,
    price_on: sale.price_on,
    price: sale.price,
    branch_id: sale.sale_branches.length > 0 ? sale.sale_branches[0].branch_id : null,
    agent_id: sale.sale_agents.length > 0 ? sale.sale_agents[0].agent_id : '',
  } as StorageSale;
}


export const getAgentSalesFromId = async (id: string): Promise<ResponseAgentSales | null> => {
  try {
    const response = await getFetchWithTor(`https://gateway.homes.co.nz/agents/${id}/sales?limit=1000&page=1`);
    if(response === null) return null;
    return await response.json() as ResponseAgentSales;
  } catch (error) {
    console.error(`Failed to fetch sales for agent ${id}:`, error);
    return null;
  }
}

export const getAllAgentSalesFromExternal = async (): Promise<ResponseAgentSales[]> => {
  const agents = await getAllAgentsFromExternal();
  const sales: ResponseAgentSales[] = [];
  console.log(`Agent Count: ${agents.length}`);

  const promises = agents.slice(0, 400).map(agent => {
    return getAgentSalesFromId(agent.id).then(response => {
      console.log(`Fetched sales for agent ID: ${agent.id}`);
      if (response !== null && response.sales.length > 0) sales.push(response);
    });
  });

  console.log("Waiting for all agent sales to be fetched...");

  await Promise.all(promises);

  return sales;
}