import { useEffect, useRef, useState } from "react";
import Map from "./Map";
import WorldLevel from "./WorldLevel";
import { useLocation } from "react-router-dom";

const CountriesTraveled: React.FC = () => {
  const location = useLocation();

  const countryRefs = useRef<SVGPathElement[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<SelectedCountry[]>(
    []
  );

  useEffect(() => {
    const search = location.search;
    const countriesString = new URLSearchParams(search).get("countries");
    // countriesString?.slice(0, -1);
    const countries = countriesString?.slice(0, -1).split(",").map((country) => {
      const data = country.split("-");
      return { id: data[0], value: Number(data[1]) } as SelectedCountry;
    });
    setSelectedCountries([...countries!]);
  }, []);

  const getTotal = (): number => {
    let total = 0;
    selectedCountries.forEach((country) => (total += country.value));
    return total;
  };

  return (
    <div className="App flex flex-col gap-y-3 py-3">
      <div className="flex flex-col-reverse lg:flex-row justify-center gap-x-3 gap-y-3 bg-white px-2">
        <Map selectedCountries={selectedCountries} />
        <WorldLevel total={getTotal()} />
      </div>
    </div>
  );
};

export default CountriesTraveled;
