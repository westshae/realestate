import { NextApiRequest, NextApiResponse } from 'next';
import { OrdersRequest } from '@/models/order.model';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const body = req.body;

      if (!Array.isArray(body)) {
        return res.status(400).json({ message: 'Request body must be an array' });
      }

      // Validate each order in the array
      const orders: OrdersRequest[] = body;
      if (!orders.every(order => 
        typeof order === 'object' && 
        order !== null
      )) {
        return res.status(400).json({ message: 'Invalid order format' });
      }

      const price = orders.length * 500;

      return res.status(200).json({ price: price });
    } catch (error) {
      console.error('Error getting price:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}