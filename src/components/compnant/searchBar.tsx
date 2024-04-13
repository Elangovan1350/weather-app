"use client";

import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { Button } from "../ui/button";

interface DataSug {
  name: string;
  coordinates: Coordinates;
}
interface Coordinates {
  lon: number;
  lat: number;
}
const SearchBar = () => {
  const router = useRouter();
  const [rawData, setRawData] = useState<DataSug[]>();
  console.log(rawData);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const typing = e.target.value;
    axios
      .get(
        `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?select=name%2Ccoordinates&where=search(name%2C%22${typing}%22)&limit=5`
      )
      .then((data) => {
        setRawData(data.data.results);
      });
    console.log(typing);
  }
  return (
    <div className="  ">
      <Input
        className="w-72 sm:w-96"
        type="text"
        placeholder={` Search City ...`}
        onChange={handleChange}
      />
      <div className="relative">
        {rawData && (
          <div className="absolute top-0 bg-white left-0 right-0 border ">
            {rawData &&
              rawData?.map((sug, i) => {
                return (
                  <Button
                    variant={"ghost"}
                    key={i}
                    className="hover:bg-neutral-300 text-left h-10 z-50 block w-full "
                    onClick={() => {
                      router.push(
                        `/city/${sug.coordinates.lon}/${sug.coordinates.lat}`
                      );
                    }}
                  >
                    {sug.name}
                  </Button>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
