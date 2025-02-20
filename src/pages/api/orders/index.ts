import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db/index';
import { ordersTable } from '@/db/schema';
import { OrdersRequest } from '@/models/order.model';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const orders = await db.select().from(ordersTable);
      return res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

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

      const mappedOrders = orders.map(order => ({
        clientId: order.client_id || 0,
        coffeeType: order.coffee_type || 'default',
        milkType: order.milk_type || 'none',
        sugarCount: order.sugar_count || 0,
        stageNumber: 0,
        stageNotified: 0,
        stageMessage: 'Order received',
      }));

      const insertedOrders = await db
        .insert(ordersTable)
        .values(mappedOrders)
        .returning({ id: ordersTable.id });

      const price = orders.length * 500;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: price, 
        currency: 'usd',
        payment_method_types: ['card'],
        metadata: {
          order_ids: insertedOrders.map(order => order.id).join(','),
        },
        receipt_email: 'customer@example.com',
      });

      return res.status(200).json({ clientSecret: paymentIntent.client_secret, price: price });
    } catch (error) {
      console.error('Error creating orders:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}