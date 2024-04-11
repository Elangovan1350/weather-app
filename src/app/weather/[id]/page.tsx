import React from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PaginationDemo } from "@/components/compnant/paginatin";
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
const Weather = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const calculation = Number(id) * 100;

  const data = await axios.get(
    `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?select=name%2Ccoordinates%2Ctimezone%2Clabel_en&limit=100&offset=${calculation}`
  );
  const total: Total = await data.data;
  const cityData: CityData[] = total.results;

  return (
    <div className="">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Timezone</TableHead>
            <TableHead>Co-ordinates</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cityData.map((city, i) => (
            <TableRow key={i}>
              <TableCell>
                <form
                  action={async () => {
                    "use server";

                    redirect(
                      `/city/${city.coordinates.lon}/${city.coordinates.lat}`
                    );
                  }}
                >
                  <Button variant={"link"} type="submit">
                    {city.name}
                  </Button>
                </form>
              </TableCell>
              <TableCell>{city.label_en}</TableCell>
              <TableCell>{city.timezone}</TableCell>
              <TableCell>
                {city.coordinates.lon}, {city.coordinates.lat}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationDemo number={Number(id)} />
    </div>
  );
};

export default Weather;
