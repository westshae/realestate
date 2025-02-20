import { create } from 'zustand';

interface CartItem {
  coffee_type: string;
  milk_type: string;
  sugar_count: number;
  client_id: number;
}

const useCartStore = create<{
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
}>((set) => ({
  cart: [],
  addToCart: (item: CartItem) => set((state) => ({ cart: [...state.cart, item] })),
  removeFromCart: (index: number) => set((state) => ({
    cart: state.cart.filter((_, i) => i !== index)
  })),
}));

export default useCartStore;