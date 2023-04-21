import Page from "../interfaces/Page";
import COUNTRIES from "./Countries";
import COUNTRIES_CONTINENT from "./CountriesContinents";
import OCEANIA from "./Oceania";

const PAGES: Page[] = [
  {
    path: '/',
    continent: "World",
    countries: COUNTRIES,
    width: 1009.6727,
    height: 665.96301,
  },
  {
    path: '/oceania',
    continent: "Oceania",
    countries: OCEANIA,
    width: 1000,
    height:400,
    viewBox: "27.42 407.34 577.78 238.63"
  },
  {
    path: '/asia',
    continent: "Asia",
    countries: COUNTRIES_CONTINENT.filter(country => country.continent === 'AS'),
    width: 600,
    height: 600,
    viewBox: "570.77 276.19 313.5 217.43"
  },
  {
    path: '/africa',
    continent: "Africa",
    countries: COUNTRIES_CONTINENT.filter(country => country.continent === 'AF'),
    width: 600,
    height: 600,
    viewBox: "403.67 350.36 269.33 273.1"
  },
  {
    path: '/europe',
    continent: "Europe",
    countries: COUNTRIES_CONTINENT.filter(country => country.continent === 'EU'),
    width: 600,
    height: 600,
    viewBox: "387 39.03 621.98 343.71"
  },
  {
    path: '/north-america',
    continent: "North America",
    countries: COUNTRIES_CONTINENT.filter(country => country.continent === 'NA'),
    width: 600,
    height: 600,
    viewBox: "0.25 0.15 442.68 442.69"
  },
  {
    path: '/south-america',
    continent: "South America",
    countries: COUNTRIES_CONTINENT.filter(country => country.continent === 'SA'),
    width: 600,
    height: 600,
    viewBox: "167.67 427.88 233.63 237.71"
  },
];

export default PAGES;