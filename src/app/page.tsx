import SearchBar from "@/components/compnant/searchBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen bg-cyan-200 flex justify-center items-center">
      <div>
        <SearchBar />
      </div>
      <Button variant={"secondary"}>
        <Link href={"/weather/0"}>All City</Link>
      </Button>
    </div>
  );
}
