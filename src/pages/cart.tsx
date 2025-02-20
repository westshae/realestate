import CheckoutForm from '@/components/ui/compound/CheckoutForm';
import useCartStore from '@/components/stores/cart';
import { Button } from '@/components/ui/basic/button';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { Trash2 } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface OrderItem {
  coffee_type: string;
  milk_type: string;
  sugar_count: number;
  client_id: number;
}

const CartPage: React.FC = () => {
  const router = useRouter();
  const { cart, removeFromCart } = useCartStore();
  const total = cart.length * 5; // $5 per coffee

  const handleRemoveFromCart = (index: number) => {
    removeFromCart(index);
    if (cart.length === 1) {
      router.push('/selection');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <Button asChild>
              <Link href="/selection">Order Coffee</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-2 mb-8 max-h-[50vh] overflow-y-auto">
              {cart.map((item: OrderItem, index: number) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{item.coffee_type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h3>
                  <p className="text-gray-600">Milk: {item.milk_type}</p>
                  <p className="text-gray-600">Sugar: {item.sugar_count}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-accent font-bold text-lg">$5.00</span>
                  <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveFromCart(index)}
                  >
                  <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                </div>
              </div>
              ))}
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg md:relative md:shadow-none">
              <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold">Total:</span>
                  <span className="text-accent text-2xl font-bold">${total.toFixed(2)}</span>
                </div>

                <div className="space-y-4">
                  <Elements stripe={stripePromise}>
                    <CheckoutForm />
                  </Elements>

                  <Button variant="outline" className="w-full">
                    <Link href="/selection">Add Another Coffee</Link>
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
