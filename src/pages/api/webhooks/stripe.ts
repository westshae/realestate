import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { db } from '@/db/index';
import { ordersTable } from '@/db/schema';
import { inArray } from 'drizzle-orm';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    let event;

    try {
      const rawBody = await new Promise<Buffer>((resolve, reject) => {
        const chunks: Buffer[] = [];
        req.on('data', (chunk) => chunks.push(chunk));
        req.on('end', () => resolve(Buffer.concat(chunks)));
        req.on('error', reject);
      });

      const signature = req.headers['stripe-signature'];

      if (!signature) {
        throw new Error('No stripe-signature header found');
      }

      // When using stripe listen locally, use the webhook signing secret provided in the CLI
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);

      console.log('Webhook verified');
        } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Webhook verification failed:', errorMessage);
      return res.status(400).send(`Webhook Error: ${errorMessage}`);
    }

    // Handle the event
    switch (event.type) {
      case 'charge.succeeded':
        const charge = event.data.object as Stripe.Charge;
        const orderIds = charge.metadata.order_ids;
        console.log('💰 Payment received and available for order_ids:', orderIds);
        const orderIdArray = orderIds.split(',').map(Number);
        await db
          .update(ordersTable)
          .set({
            stageNumber: 1,
            stageMessage: `Payment Confirmed for ${ordersTable.coffeeType}`,
          })
          .where(inArray(ordersTable.id, orderIdArray));

        break;
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default handler;
