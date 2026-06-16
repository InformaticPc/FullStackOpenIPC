import axios from "axios";
import { useState, useEffect } from "react";
// WEATHER ICON API: https://old.openweathermap.org/weather-conditions
// https://openweathermap.org/img/wn/{ICONid}@2x.png [2x you can put '4x' too]
//

const weatherIcon = (id) => {
  return `https://openweathermap.org/img/wn/${id}@4x.png`;
};
// Add a button for each option 'show' that will trigger to render that country
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
// using 'Country(...)' component
// -------API CALL-------
const weatherCall = (lat, lon) => {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d4315ec826b75727603bf803b373587e&units=metric`;
};
/**
 * 1️⃣If only one country match.
 * Render more information of the 'country'
 * object passed by prop
 * @param {object} country
 */
const Country = ({ country: oneCountry }) => {
  const [apiWeather, setApiWeather] = useState(null);

  const hook = () => {
    axios
      .get(weatherCall(oneCountry.latlng[0], oneCountry.latlng[1]))
      .then((response) => {
        console.log("fetchin weather api:", response.data.weather);
        setApiWeather(response.data);
      });
  };

  useEffect(hook, []);
  if (apiWeather == null) return;

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
      <hr />
      <h2>{apiWeather.name}</h2>
      <img src={weatherIcon(apiWeather.weather.icon)}></img>
      <p>{apiWeather.main.temp} °celcius</p>
    </>
  );
};

export { CountryList, Country };
// modify commits d -> e in git
