import { Button } from "@/components/ui/basic/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Button variant="outline">
        <Link href="/admin/dashboard">Nav to /dashboard</Link>
      </Button>
    </div>
  );
}
