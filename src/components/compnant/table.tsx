import { redirect } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

const TableData = ({ cityData }: { cityData: CityData[] }) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Country</TableHead>
            <TableHead className="">Timezone</TableHead>
            <TableHead className="">Co-ordinates</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cityData.map((city, i) => (
            <TableRow
              key={i}
              className={`${i % 2 === 0 ? "bg-neutral-50" : ""}`}
            >
              <TableCell>
                <form
                  action={async () => {
                    "use server";

                    redirect(
                      `/city/${city.coordinates.lon}/${city.coordinates.lat}`
                    );
                  }}
                >
                  <Button
                    className="text-blue-500"
                    variant={"link"}
                    type="submit"
                  >
                    {city.name}
                  </Button>
                </form>
              </TableCell>
              <TableCell>{city.label_en}</TableCell>
              <TableCell className="">{city.timezone}</TableCell>
              <TableCell className="">
                {city.coordinates.lon}, {city.coordinates.lat}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableData;
