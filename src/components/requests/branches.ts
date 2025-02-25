import { getFetchWithTor } from "../lib/tor";

interface ResponseBranchStats {
  sales: number;
  for_sales: number;
  rentals: number;
  sales_in_area: number;
  for_sales_in_area: number;
  rentals_in_area: number;
}

interface ResponseBranch {
  id: string;
  role: string;
  banner_url: string;
  branch_name: string;
  brand_name: string;
  banner_background_hex_colour: string;
  logo_url: string;
  legal_name: string;
  phone: string;
  canonical_url: string[];
  rental_partnership: string;
  residential_partnership: string;
  tm_id: string;
  detail: string | null;
  stats: ResponseBranchStats;
}

interface ResponseBranches {
  branches: ResponseBranch[];
}

export interface StorageBranch {
  id: string;
  role: string;
  branch_name: string;
  brand_name: string;
  logo_url: string;
  phone: string;
  total_sales: number;
  total_listed: number;
}

export const convertBranchResponseToStorage = (agent: ResponseBranch): StorageBranch => {
  return {
    id: agent.id,
    role: agent.role,
    branch_name: agent.branch_name,
    brand_name: agent.brand_name,
    logo_url: agent.logo_url,
    phone: agent.phone,
    total_sales: agent.stats.sales,
    total_listed: agent.stats.for_sales,
  } as StorageBranch;
}


export const getPageOfBranches = async (page: number): Promise<ResponseBranches | null> => {
  try {
    const response = await getFetchWithTor(`https://gateway.homes.co.nz/cities/100132/branches/sales?latitude=-41.293189750546695&longitude=174.77662621618384&page=${page}&filter=&sort=Sales\\`);
    
    return await response.json() as ResponseBranches;
  } catch (error) {
    console.error(`Failed to fetch branches for page ${page}:`, error);
    return null;
  }
}

export const getAllBranchesFromExternal = async (): Promise<ResponseBranch[]> => {
  let branches: ResponseBranch[] = [];
  let page = 1;
  let response: ResponseBranches | null;

  const promises = [];
  do {
    promises.push(await getPageOfBranches(page));
    page++;
    response = await getPageOfBranches(page);
  } while (response && response.branches.length > 0);

  const results = await Promise.all(promises);
  results.forEach(result => {
    if (result) {
      branches = branches.concat(result.branches);
    }
  });

  return branches;
}
