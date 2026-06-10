const handlerShowButton = (e, country) => {
  e.preventDefault();
  console.log("buttong clicked", e);
  console.log("button Country", country);

  return <Country country={country}></Country>;
  // not working. It does see the country object but it doesn't render it
  // I see the issue: 1st you are using a .map() <== this only works for arrays
  // but here you have the object itself. In the App <Country> component is
  // called as an array of only 1 element [{...}] <--like so.
  /*Possible solution:
  remove the .map() from <Country> component and call the .map() function at App.jsx
  line 53, that renders <Country> component. That way it acces straight away
  to the object, and our Component <Country> only need to render the object info */
};
/**
 * 🔟<= options Receive an array of countries and
 * make render an ordered list of it.
 * @param {string[]} countries
 */
const CountryList = ({ list }) => {
  return (
    <ol>
      {list.map((country) => {
        return (
          <>
            <li key={country.name.official}>
              {country.name.official}{" "}
              <button onClick={(e) => handlerShowButton(e, country)}>
                Show
              </button>
            </li>
          </>
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
