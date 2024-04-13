import React from "react";
import axios from "axios";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PaginationDemo } from "@/components/compnant/paginatin";
import TableData from "@/components/compnant/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
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

interface Flags {
  png: string;
  svg: string;
  alt: string;
}
interface Name {
  common: string;
  official: string;
}

interface Country {
  flags: Flags;
  name: Name;
}
const Weather = async ({ params }: { params: { id: string[] } }) => {
  const { id } = params;

  const id1 = Number(id[0]);
  const assend = (id[1] as string) || "ASC";
  const filter = (id[2] as string) || "name";
  const country = (id[3] as string) || "india";

  const calculation = id1 * 100;
  const data = await axios.get(
    `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?select=name%2Clabel_en%2Ctimezone%2Ccoordinates&where=search(label_en%2C%22${country}%22)&order_by=${filter}%20${assend}&limit=100&offset=${calculation}`
  );
  const total: Total = await data.data;
  const cityData: CityData[] = total.results;

  const getCountryData = await axios.get(
    "https://restcountries.com/v3.1/all?fields=name,flags"
  );
  const countryData: Country[] = getCountryData.data;

  return (
    <div className="">
      <h1 className="text-center text-xl sm:text-3xl font-semibold my-6">
        City And Country Name Table
      </h1>
      <div className="mb-5">
        <form
          action={async (e: FormData) => {
            "use server";
            const selectCountry = e.get("selectCon");
            const selectItem = e.get("selectId");

            redirect(`/weather/0/${assend}/${selectItem}/${selectCountry}`);
          }}
          className="flex justify-center flex-col items-center gap-3"
        >
          <div className="flex gap-x-2 z-50">
            <label className="text-xl font-semibold">Country:</label>
            <Select name="selectCon" defaultValue={country}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={country} />
              </SelectTrigger>
              <SelectContent>
                {countryData.map((data, i) => {
                  return (
                    <SelectItem key={i} value={data.name.common}>
                      <Image
                        className="inline-block mr-2 h-auto w-auto"
                        src={data.flags.png}
                        alt={data.flags.alt}
                        width={20}
                        height={20}
                      />

                      {data.name.common}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-x-2 z-50">
            <label className="text-xl font-semibold">Filter:</label>
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
          </div>

          <Button type="submit">submit</Button>
        </form>
      </div>
      {/* <div className="mb-5">
        <form
          action={async (e: FormData) => {
            "use server";
            const selectItem = e.get("selectId");
            redirect(`/weather/${id1}/${assend}/${selectItem}/${country}`);
          }}
          className="flex justify-center gap-3"
        >
          <label className="text-xl font-semibold">Filter:</label>
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
      </div> */}
      <div className="flex gap-5 sm:gap-10 justify-center mb-5">
        <form
          action={async () => {
            "use server";
            redirect(`/weather/${id1}/ASC/${filter}/${country}`);
          }}
        >
          <Button disabled={assend == "ASC" ? true : false}>
            Assending Order
          </Button>
        </form>
        <form
          action={async () => {
            "use server";
            redirect(`/weather/${id1}/DESC/${filter}/${country}`);
          }}
        >
          <Button disabled={assend == "DESC" ? true : false}>
            Desending Order
          </Button>
        </form>
      </div>

      <TableData cityData={cityData} />
      <PaginationDemo
        number={id1}
        assend={assend}
        filter={filter}
        country={country}
        total={total.total_count}
      />
    </div>
  );
};

export default Weather;
