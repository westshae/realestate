import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/index';
import { ordersTable } from '@/db/schema';
import { StageRequest } from '@/models/stage.model';
import { eq } from 'drizzle-orm';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest, res: NextResponse) {
  if (req.method === 'GET') {
    const { searchParams } = req.nextUrl;
    const client_id = searchParams.get('client_id')
    if (!client_id || typeof client_id !== 'string') {
      return NextResponse.json({ message: 'Client ID is required' }, { status: 400 });
    }


    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder.encode('data: {"connection": "established"}\n\n'));

        const checkOrders = async () => {
          try {
            const orders = await db
              .select()
              .from(ordersTable)
              .where(eq(ordersTable.clientId, parseInt(client_id)));

            for (const order of orders) {
              if (order.stageNotified !== order.stageNumber) {
                await db
                  .update(ordersTable)
                  .set({
                    stageNotified: order.stageNumber,
                    stageMessage: order.stageMessage,
                  })
                  .where(eq(ordersTable.id, order.id));

                controller.enqueue(encoder.encode(`data: ${JSON.stringify({
                  orderId: order.id,
                  stageNumber: order.stageNumber,
                  stageMessage: order.stageMessage,
                })}\n\n`));
              }
            }
          } catch (error) {
            console.error('Error in SSE:', error);
          }
        };

        const intervalId = setInterval(checkOrders, 5000);

        req.signal.addEventListener('abort', () => {
          clearInterval(intervalId);
          controller.close();
        });
      }
    });

    res = new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
    return res;
  }

  if (req.method === 'POST') {
    try {
      const body = await req.json();

      const stageData = body as StageRequest;
      if (!stageData || typeof stageData !== 'object') {
        return NextResponse.json({ message: 'Invalid stage request format' }, { status: 400 });
      }

      const result = await db
        .update(ordersTable)
        .set({
          stageMessage: stageData.stage_message,
          stageNumber: stageData.stage_number,
        })
        .where(eq(ordersTable.id, stageData.order_id))
        .returning();

      return NextResponse.json(result, { status: 201 });
    } catch (error) {
      console.error('Error editing stage:', error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
  }

  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}