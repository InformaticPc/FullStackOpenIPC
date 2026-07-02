import axios from "axios";
import { useState, useEffect } from "react";

const api_key = import.meta.env.VITE_API_WEATHER_KEY;
const weatherIcon = (id) => {
  return `https://openweathermap.org/img/wn/${id}@2x.png`;
};
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
// -------API CALL-------

const weatherCall = (lat, lon) => {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
};
/**
 * 1️⃣If only one country match.
 * Render more information of the 'country'
 * object passed by prop
 * @param {object} country
 */
const Country = ({ country }) => {
  const [apiWeather, setApiWeather] = useState(null);
  const hook = () => {
    axios
      .get(weatherCall(country.latlng[0], country.latlng[1]))
      .then((response) => {
        console.log("fetchin weather api:", response.data);
        setApiWeather(response.data);
      });
  };

  useEffect(hook, []);
  if (apiWeather == null) return;

  return (
    <>
      <h2>{country.name.official}</h2>
      <h4>Continent:</h4>
      <ul>
        {country.continents.map((continent, key) => {
          return <li key={key}>{continent}</li>;
        })}
      </ul>
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
      <hr />
      <h1>WEATHER</h1>
      <h2>{apiWeather.name}</h2>
      <p>Temperature {apiWeather.main.temp} °celcius</p>
      {apiWeather.weather.map((weather, key) => {
        return (
          <>
            <img key={weather.icon} src={weatherIcon(weather.icon)}></img>
            <span key={key}>
              {weather.main} | wind:{apiWeather.wind.speed} m/s💨
            </span>
          </>
        );
      })}
    </>
  );
};

export { CountryList, Country };
