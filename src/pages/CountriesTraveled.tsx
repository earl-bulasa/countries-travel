import { useEffect, useRef, useState } from "react";
import Map from "../components/Map";
import WorldLevel from "../components/WorldLevel";
import { useLocation } from "react-router-dom";
import SelectedCountry from "../interfaces/SelectedCountry";
import Country from "../interfaces/Country";
import CountryDouble from "../interfaces/CountryContinent";

interface CountriesTraveledProps {
  countries: Country[];
  name: string;
  height: number;
  width: number;
  viewBox?: string;
}

const CountriesTraveled: React.FC<CountriesTraveledProps> = ({
  countries,
  name,
  width,
  height,
  viewBox,
}) => {
  const location = useLocation();

  const countryRefs = useRef<SVGPathElement[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<SelectedCountry[]>(
    []
  );

  useEffect(() => {
    console.log("asd");
    const search = location.search;
    const countriesString = new URLSearchParams(search).get("countries");
    // countriesString?.slice(0, -1);
    let countriesSplit = countriesString?.split(",");
    // console.log(countriesSplit);
    if (countriesSplit?.length === 1) {
      countriesSplit = countriesString?.split("%2C");
    }

    const countries = countriesSplit?.map((country) => {
      let data = country.split("-");
      return { id: data[0], value: Number(data[1]) } as SelectedCountry;
    });
    setSelectedCountries([...countries!]);
  }, []);

  const getTotal = (): number => {
    let total = 0;
    selectedCountries.forEach((country) => (total += country.value));
    return isNaN(total) ? 0 : total;
  };

  return (
    <div className="App flex flex-col gap-y-3 py-3">
      <div className="flex flex-col-reverse lg:flex-row justify-center gap-x-3 gap-y-3 bg-white px-2">
        <Map
          selectedCountries={selectedCountries}
          countries={countries}
          width={width}
          height={height}
          name={name}
          viewBox={viewBox}
        />
        <WorldLevel name={name} total={getTotal()} />
      </div>
    </div>
  );
};

export default CountriesTraveled;
