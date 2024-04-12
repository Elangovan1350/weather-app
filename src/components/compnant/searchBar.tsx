"use client";

import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

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
    <div className="">
      <Input type="text" onChange={handleChange} />
      <div className="relative">
        <div className="absolute top-0">
          {rawData?.map((sug, i) => {
            return (
              <div key={i}>
                <p
                  onClick={() => {
                    router.push(
                      `/city/${sug.coordinates.lon}/${sug.coordinates.lat}`
                    );
                  }}
                >
                  {sug.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
