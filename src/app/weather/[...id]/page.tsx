import React from "react";
import axios from "axios";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PaginationDemo } from "@/components/compnant/paginatin";
import { revalidatePath } from "next/cache";
import TableData from "@/components/compnant/table";
interface CityData {
  name: string;
  label_en: string;
  timezone: string;
  coordinates: Coordinates;
}
interface Coordinates {
  lon: number;
  lat: number;
}
interface Total {
  total_count: number;
  results: CityData[];
}
const Weather = async ({ params }: { params: { id: string[] } }) => {
  const { id } = params;

  const id1 = Number(id[0]);
  const assend = (id[1] as string) || "ASC";

  const calculation = id1 * 100;
  const data = await axios.get(
    `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?select=name%2Ccoordinates%2Ctimezone%2Clabel_en&order_by=name%20${assend}&limit=100&offset=${calculation}`
  );
  const total: Total = await data.data;
  const cityData: CityData[] = total.results;

  return (
    <div className="">
      <h1 className="text-center text-3xl font-semibold my-6">
        City And Country Name Table
      </h1>
      <div className="flex gap-10 justify-center mb-5">
        <form
          action={async () => {
            "use server";
            redirect(`/weather/${id1}/ASC`);
          }}
        >
          <Button>Assending Order</Button>
        </form>
        <form
          action={async () => {
            "use server";
            redirect(`/weather/${id1}/DESC`);
          }}
        >
          <Button>Desending Order</Button>
        </form>
      </div>

      <TableData cityData={cityData} />
      <PaginationDemo number={id1} assend={assend} />
    </div>
  );
};

export default Weather;
