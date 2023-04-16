import { useState } from "react";
import COUNTRIES from "./data/Countries";
import Tooltip from "./ToolTip";

interface MapProps {
  handleCountryClick: (e: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
  handleCountryMouseLeave: (
    e: React.MouseEvent<SVGPathElement, MouseEvent>
  ) => void;
  handleCountryMouseHover: (
    e: React.MouseEvent<SVGPathElement, MouseEvent>
  ) => void;
  addToCountryRefs: (e: SVGPathElement ) => void;
}

const Map: React.FC<MapProps> = ({
  handleCountryClick,
  handleCountryMouseLeave,
  handleCountryMouseHover,
  addToCountryRefs,
}) => {
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
        {COUNTRIES.map((country) => (
          <path
            ref={(e) => addToCountryRefs(e!)}
            d={country.d}
            id={country.id}
            aria-label={country.title}
            aria-level={0}
            onMouseEnter={handleCountryMouseHover}
            onMouseLeave={handleCountryMouseLeave}
            onClick={handleCountryClick}
            key={country.id}
          ></path>
        ))}
      </svg>
    </div>
  );
};

export default Map;
