import useCartStore from '@/components/stores/cart';
import { useClientStore } from '@/components/stores/client';
import { Button } from '@/components/ui/basic/button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from '@/components/ui/basic/label';

const coffeeOptions = [
  { "id": "cappuccino", "name": "Cappuccino", "category": "Milky" },
  { "id": "flat_white", "name": "Flat White", "category": "Milky" },
  { "id": "latte", "name": "Latte", "category": "Milky" },
  { "id": "mocha", "name": "Mocha", "category": "Milky" },
  { "id": "latte_macchiato", "name": "Latte Macchiato", "category": "Milky" },
  { "id": "espresso", "name": "Espresso", "category": "Bold" },
  { "id": "double_espresso", "name": "Double Espresso", "category": "Bold" },
  { "id": "ristretto", "name": "Ristretto", "category": "Bold" },
  { "id": "lungo", "name": "Lungo", "category": "Bold" },
  { "id": "americano", "name": "Americano", "category": "Bold" },
  { "id": "macchiato", "name": "Macchiato", "category": "Bold" },
  { "id": "affogato", "name": "Affogato", "category": "Chilled" },
  { "id": "iced_latte", "name": "Iced Latte", "category": "Chilled" },
  { "id": "iced_americano", "name": "Iced Americano", "category": "Chilled" },
]


const SelectionPage: React.FC = () => {
  const router = useRouter();

  const { addToCart } = useCartStore();
  const { getOrGenerateClientId } = useClientStore();
  const [coffeeType, setCoffeeType] = useState("");
  const [sugarCount, setSugarCount] = useState<number | null>(null);
  const [milkType, setMilkType] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [amountToAdd, setAmountToAdd] = useState(1);


  const selectedCoffee = coffeeOptions.find(coffee => coffee.id === coffeeType);

  const categories = Array.from(new Set(coffeeOptions.map((coffee) => coffee.category)))


  const handleAddToCart = async () => {
    if (!coffeeType || !milkType || sugarCount === null) return;
    try {
      for (let i = 0; i < amountToAdd; i++) {
        addToCart({
          coffee_type: coffeeType,
          milk_type: milkType,
          sugar_count: sugarCount,
          client_id: getOrGenerateClientId(),
        });
      }

      router.push('/cart');

    } catch (error) {
      console.error('Error adding to cart:', error);
    }

  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <div className="space-y-8">
        {/* Coffee Type Section */}
        <section>
          <Label className="text-2xl font-semibold text-primary block mb-4">Select Your Coffee</Label>
          <Tabs defaultValue={categories[0]} className="w-full">
            {!isMinimized && (
              <TabsList className="grid grid-cols-3 w-full mb-4">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="text-sm data-[state=active]:bg-accent data-[state=active]:text-white"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            )}
            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                {isMinimized ? (
                  <div className="w-full rounded-md border p-4">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">{selectedCoffee?.name}</div>
                      <Button
                        variant="default"
                        onClick={() => setIsMinimized(false)}
                      >
                        Change coffee type
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full rounded-md border p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {coffeeOptions
                        .filter((option) => option.category === category)
                        .map((option) => (
                          <Button
                            key={option.id}
                            variant={coffeeType === option.id ? "default" : "outline"}
                            className="justify-start w-full"
                            onClick={() => {
                              setCoffeeType(option.id);
                              setIsMinimized(true);
                            }}
                          >
                            {option.name}
                          </Button>
                        ))}
                    </div>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* Milk Type Section */}
        <section>
          <Label className="text-xl font-semibold text-primary block mb-4">Milk Type</Label>
          <div className="flex flex-wrap gap-2">
            {[
              { value: "dairy", label: "Dairy" },
              { value: "soy", label: "Soy" },
              { value: "almond", label: "Almond" },
            ].map(({ value, label }) => (
              <Button
                key={value}
                variant={milkType === value ? "default" : "outline"}
                onClick={() => setMilkType(value)}
              >
                {label}
              </Button>
            ))}
          </div>
        </section>

        {/* Sugar Amount Section */}
        <section>
          <Label className="text-xl font-semibold text-primary block mb-4">Sugar Amount</Label>
          <div className="flex flex-wrap gap-2">
            {[
              { count: 0, label: "Sugarfree" },
              { count: 1, label: "1 Teaspoon" },
              { count: 2, label: "2 Teaspoons" },
            ].map(({ count, label }) => (
              <Button
                key={count}
                variant={sugarCount === count ? "default" : "outline"}
                onClick={() => setSugarCount(count)}
              >
                {label}
              </Button>
            ))}
          </div>
        </section>

        <section>
          <Label className="text-xl font-semibold text-primary block mb-4">Quantity</Label>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setAmountToAdd(Math.max(1, amountToAdd - 1))}
            >
              -
            </Button>
            <span className="w-12 text-center">{amountToAdd}</span>
            <Button
              variant="outline"
              onClick={() => setAmountToAdd(amountToAdd + 1)}
            >
              +
            </Button>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            onClick={async () => {
              handleAddToCart();
            }}
            className="w-full sm:w-2/3"
            size="lg"
            disabled={!coffeeType || !milkType || sugarCount === null}
          >
            Add to Cart
          </Button>

          <Button variant="outline" className="w-full sm:w-1/3" size="lg">
            <Link href="/cart" className="w-full">View Cart</Link>
          </Button>
        </section>
      </div>
    </div>
  );
};

export default SelectionPage;
