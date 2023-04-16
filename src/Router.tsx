import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./Home";
import CountriesTraveled from "./CountriesTraveled";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/countries-traveled" element={<CountriesTraveled />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
