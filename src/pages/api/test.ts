import { NextApiRequest, NextApiResponse } from 'next';
import { getAllBranchesFromExternal } from '@/components/requests/branches';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const response = await getAllBranchesFromExternal();
      return res.status(200).json(response);
    } catch (error) {
      console.error('Error fetching machines:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}