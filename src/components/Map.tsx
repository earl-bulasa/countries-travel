import { useEffect, useRef, useState } from "react";
// import COUNTRIES from "../data/Countries";
import COUNTRIES_CONTINENT from "../data/CountriesContinents";
import Tooltip from "./ToolTip";
import LEVELS from "../data/Levels";
import Country from "../interfaces/Country";
import SelectedCountry from "../interfaces/SelectedCountry";
import CountryDouble from "../interfaces/CountryContinent";

interface MapProps {
  countries: Country[];
  selectedCountries?: SelectedCountry[];
  height: number;
  width: number;
  name: string;
  viewBox?: string;
  handleCountryClick?: (
    e: React.MouseEvent<SVGPathElement, MouseEvent>
  ) => void;
  handleCountryMouseLeave?: (
    e: React.MouseEvent<SVGPathElement, MouseEvent>
  ) => void;
  handleCountryMouseHover?: (
    e: React.MouseEvent<SVGPathElement, MouseEvent>
  ) => void;
  addToCountryRefs?: (e: SVGPathElement) => void;
}

const Map: React.FC<MapProps> = ({
  selectedCountries,
  handleCountryClick,
  handleCountryMouseLeave,
  handleCountryMouseHover,
  addToCountryRefs,
  countries,
  height,
  width,
  name,
  viewBox
}) => {
  const renderPath = (country: Country) => {
    let fill: string | undefined = undefined;
    if (selectedCountries) {
      const selCountry = selectedCountries.find(
        (selectedCountry) => selectedCountry.id === country.id
      );
      if (selCountry) {
        fill = LEVELS.find(
          (level) => level.value === selCountry.value
        )?.color;
      }
    }
    return (
      <path
        ref={(e) => {
          if (addToCountryRefs) addToCountryRefs(e!);
        }}
        d={country.d}
        id={country.id}
        aria-label={country.title}
        aria-level={0}
        onMouseEnter={handleCountryMouseHover}
        onMouseLeave={handleCountryMouseLeave}
        onClick={handleCountryClick}
        key={country.id}
        {...(fill
          ? {
              fill: fill,
            }
          : {})}
      ></path>
    );
  };
  return (
    <div className={`map-container ${name} m-0`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill="white"
        stroke="black"
        strokeWidth=".2"
        viewBox={viewBox || ''}
      >
        {/* {COUNTRIES_CONTINENT.filter(country => country.continent === 'SA').map((country) => renderPath(country))} */}
        {countries.map((country) => renderPath(country))}
      </svg>
    </div>
  );
};

export default Map;
