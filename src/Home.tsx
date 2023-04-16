import { useCallback, useRef, useState } from "react";
import Map from "./Map";
import Menu from "./Menu";
import Tooltip from "./ToolTip";
import Position from "./interfaces/Position";
import WorldLevel from "./WorldLevel";
import Search from "./Search";
import { toPng } from "html-to-image";
import { useNavigate } from "react-router-dom";
import { browserName } from "react-device-detect";

const BROWSER_LIST = ["Chrome", "Firefox", "Opera", "Edge", "Safari"];

const Home: React.FC = () => {
  const countryRefs = useRef<SVGPathElement[]>([]);
  const printRef = useRef<HTMLDivElement>(null);

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
  const [total, setTotal] = useState(0);

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
    const diff = value - Number(selectedCountryPath!.ariaLevel);
    setTotal(total + diff);
    selectedCountryPath!.ariaLevel = value.toString();
    setShowMenu(false);
  };

  const handleSelectSearchCountry = (id: string) => {
    const countryRef = countryRefs.current.find((ref) => ref.id === id);
    handleCountrySelected(countryRef!);
  };

  const saveAs = (blob: string, fileName: string) => {
    if (!BROWSER_LIST.includes(browserName)) {
      // setImageFile(blob);
      localStorage.setItem('imageFile', blob);
      navigate(`/countries-traveled`);
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

  // const handleDownloadImage = useCallback(() => {
  //   toPng(printRef.current!, { cacheBust: true, })
  //     .then((dataUrl) => {
  //       const link = document.createElement('a')
  //       // link.download = 'countries.png'
  //       console.log(dataUrl)
  //       link.href = dataUrl
  //       link.click()
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }, [printRef]);

  return (
    <div className="App flex flex-col gap-y-3 py-3">
      <Search handleSelectSearchCountry={handleSelectSearchCountry} />

      {showMenu && (
        <Menu
          country={selectedCountry}
          position={menuPosition}
          handleMenuSelect={handleMenuSelect}
        />
      )}

      {showTooltip && (
        <Tooltip country={tooltipCountry} position={tooltipPosition} />
      )}
      <div
        className="flex flex-col-reverse lg:flex-row justify-center gap-x-3 gap-y-3 bg-white px-2"
        ref={printRef}
      >
        <Map
          handleCountryClick={handleCountryClick}
          handleCountryMouseHover={handleCountryMouseHover}
          handleCountryMouseLeave={handleCountryMouseLeave}
          addToCountryRefs={addToCountryRefs}
        />
        <WorldLevel total={total} />
      </div>
      <button
        onClick={handleDownloadImage}
        className="shadow-lg rounded-lg bg-gray-500 text-white w-40 py-2 self-center"
      >
        {BROWSER_LIST.includes(browserName)
          ? "Download Image"
          : "Go to Image Page"}
      </button>
    </div>
  );
};

export default Home;