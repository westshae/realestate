import { Button } from "@/components/ui/basic/button";
import Link from "next/link";
import { Coffee } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="space-y-6">
      <Coffee className="h-16 w-16 mx-auto text-accent" />
      <h1 className="text-4xl font-bold tracking-tight">stupid.coffee</h1>
      <p className="text-lg text-gray-600 max-w-md mx-auto">
        The fastest cafe-quality espresso in minutes, from your fingertips.
      </p>
      <Button variant={"navigation"} size={"lg"} className="w-full max-w-xs">
        <Link href="/location" className="w-full">
        Choose your location
        </Link>
      </Button>
      </div>
    </main>
  );
}
