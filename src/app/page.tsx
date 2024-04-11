import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen bg-cyan-200 flex justify-center items-center">
      <Button variant={"outline"}>
        <Link href={"/weather/0"}>Weather</Link>
      </Button>
    </div>
  );
}
