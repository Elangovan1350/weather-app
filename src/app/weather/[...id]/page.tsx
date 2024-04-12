import React from "react";
import axios from "axios";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PaginationDemo } from "@/components/compnant/paginatin";
import { revalidatePath } from "next/cache";
import TableData from "@/components/compnant/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const filter = (id[2] as string) || "name";

  const calculation = id1 * 100;
  const data = await axios.get(
    `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?select=name%2Ccoordinates%2Ctimezone%2Clabel_en&order_by=${filter}%20${assend}&limit=100&offset=${calculation}`
  );
  const total: Total = await data.data;
  const cityData: CityData[] = total.results;

  return (
    <div className="">
      <h1 className="text-center text-xl sm:text-3xl font-semibold my-6">
        City And Country Name Table
      </h1>
      <div className="mb-5">
        <form
          action={async (e: FormData) => {
            "use server";
            const selectItem = e.get("selectId");
            redirect(`/weather/${id1}/${assend}/${selectItem}`);
          }}
          className="flex justify-center gap-3"
        >
          <label className="text-xl font-semibold" htmlFor="selectId">
            Filter:
          </label>
          <Select name="selectId" defaultValue={filter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue
                placeholder={
                  filter == "name"
                    ? "City"
                    : filter == "label_en"
                    ? "Country"
                    : "Timezone"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">City</SelectItem>
              <SelectItem value="label_en">Country</SelectItem>
              <SelectItem value="timezone">Timezone</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit">submit</Button>
        </form>
      </div>
      <div className="flex gap-10 justify-center mb-5">
        <form
          action={async () => {
            "use server";
            redirect(`/weather/${id1}/ASC/${filter}`);
          }}
        >
          <Button disabled={assend == "ASC" ? true : false}>
            Assending Order
          </Button>
        </form>
        <form
          action={async () => {
            "use server";
            redirect(`/weather/${id1}/DESC/${filter}`);
          }}
        >
          <Button disabled={assend == "DESC" ? true : false}>
            Desending Order
          </Button>
        </form>
      </div>

      <TableData cityData={cityData} />
      <PaginationDemo number={id1} assend={assend} filter={filter} />
    </div>
  );
};

export default Weather;
