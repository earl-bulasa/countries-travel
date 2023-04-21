import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import CountriesTraveled from "./pages/CountriesTraveled";
import COUNTRIES from "./data/Countries";
import OCEANIA from "./data/Oceania";
import COUNTRIES_CONTINENT from "./data/CountriesContinents";
import PAGES from "./data/Pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {PAGES.map((page) => (
          <>
            <Route
              path={page.path}
              element={
                <Home
                  countries={page.countries}
                  name={page.continent}
                  width={page.width}
                  height={page.height}
                  viewBox={page.viewBox}
                />
              }
            />
            <Route
              path={`/countries-traveled${page.path}`}
              element={
                <CountriesTraveled
                  countries={page.countries}
                  name={page.continent}
                  width={page.width}
                  height={page.height}
                  viewBox={page.viewBox}
                />
              }
            />{" "}
          </>
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
