/**
 * 🔟<= options Receive an array of countries and
 * make render an ordered list of it.
 * @param {string[]} countries
 */
const CountryList = ({ list, button }) => {
  return (
    <ol>
      {list.map((country) => {
        return (
          <li key={country.name.official}>
            {country.name.official}{" "}
            <button onClick={(e) => button(e, country.name.official)}>
              Show
            </button>
          </li>
        );
      })}
    </ol>
  );
};
// Add a button for each option 'show' that will trigger to render that country
// using 'Country(...)' component
/**
 * 1️⃣If only one country match.
 * Render more information of the 'country'
 * object passed by prop
 * @param {object} country
 */
const Country = ({ country: oneCountry }) => {
  return (
    <>
      <h1>{oneCountry.name.official}</h1>
      <p>Capital: {oneCountry.capital}</p>
      <p>Area: {oneCountry.area}</p>
      <h3>Laguages</h3>
      <ul>
        {Object.values(oneCountry.languages).map((language, index) => {
          return <li key={index}>{language}</li>;
        })}
      </ul>
      <br></br>
      <img src={oneCountry.flags.png}></img>
    </>
  );
};

export { CountryList, Country };
