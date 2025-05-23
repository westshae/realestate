import { verifyToken } from '@/requests/auth/auth.services';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { email, token } = req.body;

      if (typeof email !== 'string' || typeof token !== 'string') {
        return res.status(400).json({ message: 'Invalid input' });
      }

      const response = await verifyToken(email, token);

      return res.status(200).json(response);
    } catch (error) {
      console.error('Error fetching machines:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}