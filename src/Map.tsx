import { useState } from "react";
import COUNTRIES from "./data/Countries";
import Tooltip from "./ToolTip";
import LEVELS from "./data/Levels";
import Country from "./interfaces/Country";
import SelectedCountry from "./interfaces/SelectedCountry";

interface MapProps {
  selectedCountries?: SelectedCountry[];
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
    <div className="map-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1009.6727"
        height="665.96301"
        fill="white"
        stroke="black"
        strokeWidth=".2"
      >
        {COUNTRIES.map((country) => renderPath(country))}
      </svg>
    </div>
  );
};

export default Map;
