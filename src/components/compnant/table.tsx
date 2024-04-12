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
            <TableHead className="hidden sm:table-cell">Timezone</TableHead>
            <TableHead className="hidden md:table-cell">Co-ordinates</TableHead>
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
              <TableCell className="hidden sm:table-cell">
                {city.timezone}
              </TableCell>
              <TableCell className="hidden md:table-cell">
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
