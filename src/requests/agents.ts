interface ResponseWellingtonAgents {
  agents: ResponseAgent[];
  total: number;
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
  rental_partnership: any;
  residential_partnership: any;
  tm_id: string;
  detail: any;
  stats: any;
}

interface ResponseStats {
  sales: number;
  for_sales: number;
  rentals: number;
  sales_in_area: number;
  for_sales_in_area: number;
  rentals_in_area: number;
}

interface ResponseSaleStats {
  confirmed_recent_sales: {
    count: number;
    display_price: string;
  };
  unconfirmed_recent_sales: {
    count: number;
    display_price: string;
  };
  all_time_confirmed_sales: {
    count: number;
    display_price: string;
  };
  council_confirmed_recent_sales: {
    count: number;
    display_price: string;
  };
  all_time_council_confirmed_sales: {
    count: number;
    display_price: string;
  };
}

interface ResponseAgent {
  id: string;
  name: string;
  role: string;
  suburb_expert: boolean;
  suburb_expert_location: string;
  profile_image_url: string;
  office_phone: string;
  mobile_phone: string;
  branch_id: string;
  branch: ResponseBranch;
  team: boolean;
  canonical_url: string[];
  detail: any;
  stats: ResponseStats;
  sale_stats: ResponseSaleStats;
  testimonials: any;
  tm_member_id: string;
}


export const getPageOfAgents = async (page: number): Promise<ResponseWellingtonAgents | null> => {
  try {
    const response = await fetch(`https://gateway.homes.co.nz/cities/100132/agents?page=${page}&sort=Sales`);
    
    return await response.json() as ResponseWellingtonAgents;
  } catch (error) {
    console.error(`Failed to fetch agents for page ${page}:`, error);
    return null;
  }
}

export const getAllAgentsFromExternal = async (): Promise<ResponseAgent[]> => {
  let agents: ResponseAgent[] = [];
  let page = 1;
  let response: ResponseWellingtonAgents | null = await getPageOfAgents(page);
  if (!response) return agents;

  const totalAgents = response.total;
  const totalPages = Math.ceil(totalAgents / response.agents.length);

  const promises = [];
  for (let i = 1; i <= totalPages; i++) {
    promises.push(getPageOfAgents(i));
  }

  const responses = await Promise.all(promises);
  responses.forEach(res => {
    if (res) {
      agents = agents.concat(res.agents);
    }
  });

  return agents;
}

