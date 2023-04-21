import Country from "./Country";

interface Page {
  path: string;
  continent: string;
  countries: Country[];
  width: number;
  height: number;
  viewBox?: string;
}

export default Page;