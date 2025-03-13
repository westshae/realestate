import { getAllAgentListingsAndUpdateDB } from '@/requests/listings/listings.controller';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      if (!process.env.LOCAL) {
        return;
      }
      const response = await getAllAgentListingsAndUpdateDB();

      return res.status(200).json(response);
    } catch (error) {
      console.error('Error fetching machines:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}