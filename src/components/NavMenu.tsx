import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const CONTINENTS = [
  "World",
  "Asia",
  "Africa",
  "Europe",
  "North America",
  "South America",
  "Oceania",
];

interface NavMenuProps {
  showNav: boolean;
  setShowNav: (showNav: boolean) => void;
}

const NavMenu: React.FC<NavMenuProps> = ({showNav, setShowNav}) => {

  return (
    <div>
      <nav className="flex flex-col">
        <ul className="hidden lg:flex justify-center gap-x-2">
          {CONTINENTS.map((continent) => (
            <li className="px-2 py-1 rounded-md hover:bg-blue-100">
              <Link
                to={
                  continent !== "World"
                  ? `/${continent
                      .toLowerCase()
                      .trim()
                      .replace(/[^\w\s-]/g, "")
                      .replace(/[\s_-]+/g, "-")
                      .replace(/^-+|-+$/g, "")}`
                  : "/"
                }
              >
                {continent}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-col lg:hidden gap-y-[6px] self-end mr-2" onClick={() => setShowNav(!showNav)}>
          <div className="w-8 h-1 bg-black"></div>
          <div className="w-8 h-1 bg-black"></div>
          <div className="w-8 h-1 bg-black"></div>
        </div>
        {showNav && (
          <ul className="shadow-sm flex flex-col lg:hidden justify-center gap-x-2 text-center absolute top-10 w-full bg-white">
            {CONTINENTS.map((continent) => (
              <li className="px-2 py-1 rounded-md hover:bg-blue-100">
                <Link
                onClick={() => setShowNav(false)}
                  to={
                    continent !== "World"
                      ? `/${continent
                          .toLowerCase()
                          .trim()
                          .replace(/[^\w\s-]/g, "")
                          .replace(/[\s_-]+/g, "-")
                          .replace(/^-+|-+$/g, "")}`
                      : "/"
                  }
                >
                  {continent}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </div>
  );
};

export default NavMenu;
