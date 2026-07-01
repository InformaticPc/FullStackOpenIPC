import axios from "axios";
import { useState, useEffect } from "react";

// WEATHER ICON API: https://old.openweathermap.org/weather-conditions
// https://openweathermap.org/img/wn/{ICONid}@2x.png [2x you can put '4x' too]

const api_key = import.meta.env.VITE_API_WEATHER_KEY;
// console.log("APIKEY: ", import.meta.env.VITE_API_WEATHER_KEY);

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
// using 'Country(...)' component
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
const Country = ({ country: oneCountry }) => {
  const [apiWeather, setApiWeather] = useState(null);

  const hook = () => {
    axios
      .get(weatherCall(oneCountry.latlng[0], oneCountry.latlng[1]))
      .then((response) => {
        console.log("fetchin weather api:", response.data);
        setApiWeather(response.data);
      });
  };

  useEffect(hook, []);
  if (apiWeather == null) return;

  return (
    <>
      <h2>{oneCountry.name.official}</h2>
      <h4>Continent:</h4>
      <ul>
        {oneCountry.continents.map((continent) => {
          return <li>{continent}</li>;
        })}
      </ul>
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
      <h1>WEATHER</h1>
      <h2>{apiWeather.name}</h2>
      <p>Temperature {apiWeather.main.temp} °celcius</p>
      {apiWeather.weather.map((weather, index) => {
        return (
          <>
            <img key={weather.icon} src={weatherIcon(weather.icon)}></img>
            <span key={index}>
              {weather.main} | wind:{apiWeather.wind.speed} m/s💨
            </span>
          </>
        );
      })}
    </>
  );
};

export { CountryList, Country };
// BUG: check APP bottom comments
