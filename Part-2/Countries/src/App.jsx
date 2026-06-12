import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { CountryList, Country } from "./components/Country_List";

function App() {
  const [filter, setFilter] = useState(null); //input text
  const [countries, setCountries] = useState(null); //countries found
  const baseURL = "https://studies.cs.helsinki.fi/restcountries/api/all";

  // console.log("COUNTRIES DATA: ", countries);

  // -------Use effect - Fetching data-------
  const hook = () => {
    if (filter) console.log("running hook...");

    axios.get(baseURL).then((response) => {
      // console.log("RESPONSE: ", response.data[102]);
      setCountries(response.data);
    });
    console.log("FILTER: ", filter);
  };
  useEffect(hook, [filter]);

  /**Value that will print the countries matched
   * @type {string[]}
   */

  const countryFiltered =
    filter === null
      ? []
      : countries.filter((countriesName) =>
          countriesName.name.official.toLowerCase().match(filter.toLowerCase())
        );

  // -------input handler-------
  const handlerFilter = (e) => {
    const value = e.target.value;
    console.log("input values/setFilter: ", value);
    setFilter(value);
  };
  console.log("filtered: ", countryFiltered);

  // Show handler
  const handlerShowButton = (e, countryName) => {
    e.preventDefault();
    console.log("buttong clicked", e);
    console.log("button Country Name: ", countryName);
    /* Is returning an array now, so try to work with that*/
    // return <Country country={country}></Country>;
    setFilter(countryName);
  };

  return (
    <>
      <section>
        Find countries: <input onChange={handlerFilter}></input>
        <br></br>
        <ol>
          {countryFiltered.length > 10 ? (
            <h3>To many matches, be more specific</h3>
          ) : countryFiltered.length === 1 ? (
            countryFiltered.map((country) => {
              return (
                <Country
                  key={country.name.official}
                  country={country}
                ></Country>
              );
            })
          ) : (
            <CountryList list={countryFiltered} button={handlerShowButton}>
              {" "}
            </CountryList>
          )}
        </ol>
      </section>
    </>
  );
}

export default App;

/*

*/
