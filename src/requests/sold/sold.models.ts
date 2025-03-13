/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SaleAgent {
  agent_id: string;
  branch_id: string | null;
  role: number;
  created_at: string;
  agent: any | null;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SaleBranch {
  branch_id: string;
  created_at: string;
  branch: any | null;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Featured {
  start_at: string | null;
  end_at: string | null;
  variant: any | null;
  highlights: any | null;
}

export interface SoldProperty {
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
  sale_agents: SaleAgent[];
  sale_branches: SaleBranch[];
  featured: Featured;
}