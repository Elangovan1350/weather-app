import React from "react";
import axios from "axios";
import Image from "next/image";
import { FaWind, FaCloud } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";
import { WiCelsius, WiThermometer } from "react-icons/wi";

const City = async ({ params }: { params: { id: string[] } }) => {
  const { id } = params;
  const lon = Number(id[0]);
  const lat = Number(id[1]);
  const weather = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=9896b8a83df95dd5b9be534146cf8c61&units=metric`
  );
  const dataWeather = await weather.data;

  return (
    <div className="md:h-screen  flex justify-center items-center ">
      <div className="w-full md:h-[500px] md:w-[800px] md:border-4 mb-14 border-neutral-400  text-center text-3xl font-semibold capitalize px-10 py-0 md:shadow-2xl shadow-neutral-700">
        <div className="flex items-center justify-center">
          <h1>{dataWeather.city.name}</h1>
          <Image
            src={`https://openweathermap.org/img/wn/${dataWeather.list[0].weather[0].icon}@2x.png`}
            alt={dataWeather.list[0].weather[0].description}
            width={100}
            height={100}
          />
        </div>
        <p className="text-center  text-4xl">
          Current Weather{<WiThermometer size={40} className="inline-block" />}:
        </p>
        <p className="flex justify-center items-center">
          <span>
            {dataWeather.list[0].main.temp}
            <WiCelsius size={60} className="inline-block" />
            {dataWeather.list[0].weather[0].main}
          </span>
          <span>
            <Image
              src={`https://openweathermap.org/img/wn/${dataWeather.list[0].weather[0].icon}@2x.png`}
              alt={dataWeather.list[0].weather[0].description}
              width={50}
              height={50}
            />
          </span>
        </p>
        <section className="grid  grid-cols-1 md:grid-cols-2 h-fit md:h-[300px] gap-5 content-center items-center justify-items-stretch">
          <div className="flex  flex-col justify-start gap-y-2 items-end">
            <div className="text-2xl flex justify-start font-medium  border-2 border-gray-500 w-full p-2">
              <WiThermometer size={40} />
              <p>Feels Like : {dataWeather.list[0].main.feels_like}</p>
              <WiCelsius size={40} />
            </div>
            <div className="text-2xl flex justify-start font-medium  border-2 border-gray-500 w-full p-2">
              <WiThermometer size={40} />
              <p>Min Temp : {dataWeather.list[0].main.temp_min}</p>
              <WiCelsius size={40} />
            </div>
            <div className="text-2xl flex justify-start font-medium  border-2 border-gray-500 w-full p-2">
              <WiThermometer size={40} />
              <p>Max Temp : {dataWeather.list[0].main.temp_max}</p>
              <WiCelsius size={40} />
            </div>
          </div>
          <div className="flex justify-start items-start flex-col  gap-y-2 font-medium text-lg">
            <div className="flex items-center gap-x-5 border-2 border-gray-500 w-full p-2">
              {<FaWind size={40} />}
              <p>Wind Speed : {dataWeather.list[0].wind.speed} KM/h</p>
            </div>
            <div className="flex items-center gap-x-5 border-2 border-gray-500 w-full p-2">
              {<FaCloud size={40} />}
              <p>Cloud : {dataWeather.list[0].clouds.all}</p>
            </div>
            <div className="flex items-center gap-x-5 border-2 border-gray-500 w-full p-2">
              {<MdVisibility size={40} />}
              <p>Visibility : {dataWeather.list[0].visibility}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default City;
