import HeadingText from "@/components/compnant/headingText";
import SearchBar from "@/components/compnant/searchBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-evenly items-center">
      <HeadingText />
      <div>
        <SearchBar />
      </div>
      <div className="text-xl flex justify-center items-center">
        <p>To see all city data click</p>
        <Button className="text-blue-600 text-xl p-2" variant={"link"}>
          <Link href={"/weather/0"}>here</Link>
        </Button>
      </div>
    </div>
  );
}
