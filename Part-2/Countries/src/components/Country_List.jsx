/**
 * Receive an array of countries and
 * make render an ordered list of it.
 * @param {string[]} countries
 */
const CountryList = ({ list }) => {
  return (
    <ol>
      {list.map((country) => {
        return <li key={country.name.official}>{country.name.official}</li>;
      })}
    </ol>
  );
};

/**
 * If only one country match.
 * Render more information of the 'country'
 * object passed by prop
 * @param {object} country
 */
const Country = ({ country: oneCountry }) => {
  return (
    <>
      {oneCountry.map((country) => {
        return (
          <>
            <h1>{country.name.official}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <h3>Laguages</h3>
            <ul>
              {Object.values(country.languages).map((language, index) => {
                return <li key={index}>{language}</li>;
              })}
            </ul>
            <br></br>
            <img src={country.flags.png}></img>
          </>
        );
      })}
    </>
  );
};

export { CountryList, Country };
