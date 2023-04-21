import { useState } from "react";
import COUNTRIES from "../data/Countries";
import Country from "../interfaces/Country";

interface SearchProps {
  countries: Country[];
  handleSelectSearchCountry: (id: string) => void;
}

const Search: React.FC<SearchProps> = ({countries, handleSelectSearchCountry}) => {
  const [search, setSearch] = useState("");
  const [hasSelected, setHasSelected] = useState(false);

  const selectCountry = (country: Country) => {
    setSearch(country.title);
    setHasSelected(true);
    handleSelectSearchCountry(country.id);
  }

  return (
    <div className="flex flex-col w-3/4 lg:w-52 self-center">
      <input
        className="border border-black rounded-md px-2 py"
        placeholder="Search"
        type="text"
        value={search}
        onChange={(e) => {
          setHasSelected(false);
          setSearch(e.currentTarget.value);
        }}
      />
      {(search && !hasSelected) && (
        <div className="flex flex-col max-h-40 overflow-auto absolute bg-white p-2 rounded-md top-12 w-[72%] lg:w-52 shadow-lg">
          <ul className="list-none">
            {countries.filter(
              (country) =>
                country.title.toLowerCase().includes(search.toLowerCase()) ||
                country.id.toLowerCase().includes(search.toLowerCase())
            ).map((country) => (
              <ol onClick={() => selectCountry(country)} key={country.id}>{country.title}</ol>
            ))}{" "}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
