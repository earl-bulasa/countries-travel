import { useCallback, useRef, useState } from "react";
import Map from "../components/Map";
import Menu from "../components/Menu";
import Tooltip from "../components/ToolTip";
import Position from "../interfaces/Position";
import WorldLevel from "../components/WorldLevel";
import Search from "../components/Search";
import { toPng } from "html-to-image";
import { Link, useNavigate } from "react-router-dom";
import { browserName } from "react-device-detect";
import SelectedCountry from "../interfaces/SelectedCountry";
import Country from "../interfaces/Country";
import NavMenu from "../components/NavMenu";
import OutsideClickHandler from "react-outside-click-handler";

const BROWSER_LIST = ["Chrome", "Firefox", "Opera", "Edge", "Safari"];

interface HomeProps {
  countries: Country[];
  name: string;
  height: number;
  width: number;
  viewBox?: string;
}

const Home: React.FC<HomeProps> = ({
  countries,
  name,
  height,
  width,
  viewBox,
}) => {
  const [showNav, setShowNav] = useState(false);

  const countryRefs = useRef<SVGPathElement[]>([]);
  const printRef = useRef<HTMLDivElement>(null);
  const [selectedCountries, setSelectedCountries] = useState<SelectedCountry[]>(
    []
  );

  const [selectedCountryPath, setSelectedCountryPath] = useState<
    EventTarget & SVGPathElement
  >();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState<Position>({} as Position);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipCountry, setTooltipCountry] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState<Position>(
    {} as Position
  );
  // const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const addToCountryRefs = (e: SVGPathElement) => {
    countryRefs.current.push(e);
  };

  const handleCountryMouseHover = (
    e: React.MouseEvent<SVGPathElement, MouseEvent>
  ) => {
    const current = e.currentTarget;
    if (current.ariaLevel == "0") {
      current.setAttribute("fill", "grey");
    }

    setShowTooltip(true);
    setTooltipCountry(current.ariaLabel!);
    const position = current.getBoundingClientRect();
    setTooltipPosition({
      x:
        position.x * (window.innerWidth > 1024 ? 1.25 : 0.35) +
        window.pageXOffset,
      y:
        position.y * (window.innerWidth > 1024 ? 1.25 : 0.35) +
        window.pageYOffset,
    });
  };

  const handleCountryMouseLeave = (
    e: React.MouseEvent<SVGPathElement, MouseEvent>
  ) => {
    const current = e.currentTarget;
    // current.ariaLevel = "3";
    if (current.ariaLevel == "0") {
      e.currentTarget.setAttribute("fill", "white");
    }

    setShowTooltip(false);
    setTooltipCountry("");
  };

  const handleCountrySelected = (e: SVGPathElement) => {
    setSelectedCountryPath(e);
    setSelectedCountry(e.ariaLabel!);
    setShowMenu(true);
    const position = e.getBoundingClientRect();
    setMenuPosition({
      x:
        position.x * (window.innerWidth > 1024 ? 1.25 : 0.35) +
        window.pageXOffset,
      y:
        position.y * (window.innerWidth > 1024 ? 1.25 : 0.35) +
        window.pageYOffset,
    });
  };

  const handleCountryClick = (
    e: React.MouseEvent<SVGPathElement, MouseEvent>
  ) => {
    const current = e.currentTarget;
    handleCountrySelected(current);
  };

  const handleMenuSelect = (value: number, color: string) => {
    selectedCountryPath?.setAttribute("fill", color);
    const newSelectedCountries = [...selectedCountries].filter(
      (country) => country.id !== selectedCountryPath?.id!
    );
    if (value > 0) {
      newSelectedCountries.push({ id: selectedCountryPath?.id!, value: value });
    }
    setSelectedCountries(newSelectedCountries);
    selectedCountryPath!.ariaLevel = value.toString();
    setShowMenu(false);
  };

  const getTotal = (): number => {
    let total = 0;
    selectedCountries.forEach((country) => (total += country.value));
    return total;
  };

  const handleSelectSearchCountry = (id: string) => {
    const countryRef = countryRefs.current.find((ref) => ref.id === id);
    handleCountrySelected(countryRef!);
  };

  const saveAs = (blob: string, fileName: string) => {
    if (!BROWSER_LIST.includes(browserName)) {
      // setImageFile(blob);
      // localStorage.setItem("imageFile", blob);
      let countriesParams = "";
      selectedCountries.forEach(
        (country) => (countriesParams += `${country.id}-${country.value},`)
      );
      navigate(
        `/countries-traveled${location.pathname}?countries=${countriesParams?.slice(0, -1)}`
      );
    } else {
      let elem = window.document.createElement("a");
      elem.href = blob;
      // console.log(blob);
      elem.download = fileName;
      elem.style.display = "none;";
      (document.body || document.documentElement).appendChild(elem);
      if (typeof elem.click === "function") {
        elem.click();
      } else {
        elem.target = "_blank";
        elem.dispatchEvent(
          new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
          })
        );
      }
      URL.revokeObjectURL(elem.href);
      elem.remove();
    }
  };

  const handleDownloadImage = () => {
    toPng(printRef.current as HTMLElement).then(function (dataUrl) {
      saveAs(dataUrl, "countries.png");
    });
  };

  return (
    <div className="App flex flex-col gap-y-3 pt-3">
      <OutsideClickHandler onOutsideClick={() => setShowNav(false)}>
        <NavMenu showNav={showNav} setShowNav={setShowNav} />
      </OutsideClickHandler>

      <Search
        countries={countries}
        handleSelectSearchCountry={handleSelectSearchCountry}
      />

      {showMenu && (
        <OutsideClickHandler onOutsideClick={() => setShowMenu(false)}>
          <Menu
            country={selectedCountry}
            position={menuPosition}
            handleMenuSelect={handleMenuSelect}
          />
        </OutsideClickHandler>
      )}

      {showTooltip && (
        <Tooltip country={tooltipCountry} position={tooltipPosition} />
      )}
      <div
        className="overflow-x-hidden flex flex-col-reverse lg:flex-row justify-center gap-x-3 gap-y-3 bg-white px-2"
        ref={printRef}
      >
        <Map
          handleCountryClick={handleCountryClick}
          handleCountryMouseHover={handleCountryMouseHover}
          handleCountryMouseLeave={handleCountryMouseLeave}
          addToCountryRefs={addToCountryRefs}
          countries={countries}
          height={height}
          width={width}
          name={name}
          viewBox={viewBox}
        />
        <WorldLevel total={getTotal()} name={name} />
      </div>
      <button
        onClick={handleDownloadImage}
        className="shadow-lg rounded-lg bg-gray-500 text-white w-40 py-2 self-center"
      >
        {BROWSER_LIST.includes(browserName)
          ? "Download Image"
          : "Go to Image Page"}
      </button>
      <footer className="flex justify-between px-2 lg:px-10 items-center bg-[#B0B1B6] text-white">
        <div>Developed by Earl John Lester Bulasa</div>
        <div>
          <p>Inspired By:</p>
          <p>
            <a href="https://my-philippines-travel-level.com/map">
              My Philippines Travel Level
            </a>
          </p>
          <p>
            <a href="https://zhung.com.tw/japanex/">JapanEX</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
