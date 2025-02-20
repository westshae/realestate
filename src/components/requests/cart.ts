import useCartStore from "../stores/cart";
import { useClientStore } from "../stores/client";

interface OrderItem {
  coffee_type: string;
  milk_type: string;
  sugar_count: number;
  client_id: number;
}

interface OrderResponse {
  order_id: number;
  // add other response fields if needed
}

export async function submitOrder() {
  try {
    const cart = useCartStore.getState().cart;

    if (!cart.length) return;

    const orderPayload: OrderItem[] = cart.map(item => ({
      coffee_type: item.coffee_type,
      milk_type: item.milk_type,
      sugar_count: item.sugar_count,
      client_id: item.client_id
    }));

    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderPayload),
    });

    if (response.ok) {
      const data = await response.json() as OrderResponse;
      useClientStore.getState().setOrderId(data.order_id);
      useClientStore.getState().setOrderStage(0);
    }
  } catch (error) {
    console.error('Error submitting orders:', error);
    throw error;
  }
}
