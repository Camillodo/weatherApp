/* eslint-disable no-console */
// == Import npm
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
// == Import
import './weather-card.scss';
import Loader from 'src/components/Loader';
import humidity from 'src/assets/img/humidity.svg';
import wind from 'src/assets/img/wind.svg';
import cloud from 'src/assets/img/cloud.svg';

// == Composant
const WeatherCard = () => {
  const [forecast, setForecast] = useState([]);
  const [forecastSpecs, setForecastSpecs] = useState([]);
  const [windSpecs, setWind] = useState([]);
  const [cloudSpecs, setCloud] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadWeatherInfo = () => {
    const weatherInfoURL = 'http://api.openweathermap.org/data/2.5/weather?q=Paris,fr&units=metric&APPID=GETYOUROWNAThttps://openweathermap.org/current';
    axios.get(weatherInfoURL)
      .then((res) => {
        setForecast(res.data.main);
        setForecastSpecs(res.data.weather[0]);
        setWind(res.data.wind);
        setCloud(res.data.clouds);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadWeatherInfo();
  }, []);

  const icon = `http://openweathermap.org/img/w/${forecastSpecs.icon}.png`;
  const today = moment().format('L');
  return (
    <div className="weather__card">
      {loading && <Loader />}
      {!loading && (
      <article className="main_card">
        <div className="weather__card__temp__info">
          <div className="weather__card__main__info">
            <h1 className="weather__card__main__date">Paris<span className="weather__card__main__date--full">{today}</span></h1>
            <h2 className="weather__card__main__temperature">{Math.round(forecast.temp)}<span className="weather__card__felt__temperature"> /{Math.round(forecast.temp_min)} <sup className="weather__card__sup">℃</sup></span>
            </h2>
          </div>
          <div className="weather__card__temp__icon">
            <img src={icon} alt="icon" className="weather__card__icon__weather__type" />
            <h2 className="weather__card__description">{forecastSpecs.main}</h2>
          </div>
        </div>
        <div className="weather__card__weatherspecs">
          <div className="weather__card__weatherspecs__container">
            <img src={wind} alt="wind__icon" className="weather__card__weatherspecs__icon" />
            <p>{Math.round(windSpecs.speed)} km/h</p>
          </div>
          <div className="weather__card__weatherspecs__container">
            <img src={humidity} alt="humidity__icon" className="weather__card__weatherspecs__icon" />
            <p>{forecast.humidity} %</p>
          </div>
          <div className="weather__card__weatherspecs__container">
            <img src={cloud} alt="cloud__icon" className="weather__card__weatherspecs__icon" />
            <p>{cloudSpecs.all}</p>
          </div>
        </div>
      </article>
      )}
    </div>

  );
};

// == Export
export default WeatherCard;
