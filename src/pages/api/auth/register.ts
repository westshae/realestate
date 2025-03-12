import { registerAccount } from '@/requests/auth/auth.services';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      if (!process.env.LOCAL) {
        return;
      }

      const { email, password, isAdmin } = req.body;

      if (typeof email !== 'string' || typeof password !== 'string' || typeof isAdmin !== 'boolean') {
        return res.status(400).json({ message: 'Invalid input' });
      }

      const response = await registerAccount(email, password, isAdmin);

      return res.status(200).json(response);
    } catch (error) {
      console.error('Error fetching machines:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}