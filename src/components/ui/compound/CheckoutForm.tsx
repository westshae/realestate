import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';
import useCartStore from '../../stores/cart';
import { useRouter } from 'next/router';
import { Button } from '../basic/button';

interface OrderItem {
  coffee_type: string;
  milk_type: string;
  sugar_count: number;
  client_id: number;
}

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [price, setPrice] = useState(-10);

  useEffect(() => {
    const fetchPrice = async () => {
      const cart = useCartStore.getState().cart;

      if (!cart.length) return;

      const orderPayload: OrderItem[] = cart.map(item => ({
        coffee_type: item.coffee_type,
        milk_type: item.milk_type,
        sugar_count: item.sugar_count,
        client_id: item.client_id
      }));

      const response = await fetch('/api/orders/price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const { price, error } = await response.json();

      if (error) {
        setMessage(error);
        return;
      }

      if (price) {
        setPrice(price);
      }
    };

    fetchPrice();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload),
    });

    const { clientSecret, error } = await response.json();

    if (error) {
      setMessage(error);
      setLoading(false);
      return;
    }

    if (!stripe || !elements) {
      setMessage('Stripe has not been initialized.');
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setMessage('Card element not found.');
      setLoading(false);
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (result.error) {
      setMessage(result.error.message || 'Payment failed');
    } else if (result.paymentIntent.status === 'succeeded') {
      setMessage('Payment successful!');
    }

    setLoading(false);

    if (result.paymentIntent?.status === 'succeeded') {
      router.push('/updates');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-6">
      {price !== -10 && message !== 'Payment successful!' && (
        <>
          <div className="w-full">
            <CardElement className="p-4 border rounded-lg" />
          </div>

          <Button
            type="submit"
            disabled={!stripe || loading}
            className="w-full"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
            }}
          >
            {loading ? 'Processing...' : `Pay $${price / 100}`}
          </Button>

        </>
      )}
      {price === -10 && (
        <div className="text-center">
          <h1>Processing Order</h1>
          <p>Calculating price...</p>
        </div>
      )}
      {message === 'Payment successful!' ? (
        <div className="text-center">
          <h1>Success!</h1>
          <p>Paid ${price / 100}</p>
        </div>
      ) : (
        message && (
          <div className="text-center">
            <h1>Notice</h1>
            <p>{message}</p>
          </div>
        )
      )}
    </form>
  );
}
