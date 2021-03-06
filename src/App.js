import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import api from './api/weather';
import DailyForecast from './components/daily/Forecast';
import TodayForecast from './components/today/Forescast';
import HourForecast from './components/hour/Forecast';
import clockIcon from "./assets/image/clock-icon.png";

function App() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  let myLocation =  (search === '') ? "las pinas" : search;

  const [ data, setData ] = useState({ main: {}, weather: {}, wind: {} });
  const [ isLoading, setIsLoading ] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
    setIsLoading(true);
        const weatherData = await axios(`${api.base}weather?q=${myLocation}&units=metric&APPID=${api.key}`);
        setData({
            main: weatherData.data.main,
            weather: weatherData.data.weather[0],
            wind: weatherData.data.wind
        });
    setIsLoading(false);
    };
    fetchData();
  }, [myLocation]);

  return (
    <div className="app">

      <div class={ isLoading ? "loading-container" : "loading-container hide" }>
        <div class="loading"></div>
        <p>Loading...</p>
      </div> 

      <div className="wrapper d-flex">

        <div className="main">

          <div className="time-container-xs d-block d-md-none">
            <img src={clockIcon} alt="" className="clock-icon"/>
            <span>{ moment().format('h:mm a') }</span>
          </div>

          <div className="search-box">
            <div className="search-icon"></div>
            <form
              className="search-form"
              onSubmit={(e) => {
                setSearch(query);
                e.preventDefault();
              }}
            >
              <input 
                type="text" 
                placeholder="Enter Location"
                value={query}
                onChange={event => setQuery(event.target.value)}
              />  
            </form>
          </div>

          <TodayForecast main={data.main} weather={data.weather} wind={data.wind} city={myLocation} />
        
          <HourForecast city={myLocation} />

        </div>{/* main */}

        <DailyForecast city={myLocation} />

      </div>{/* wrapper */}
    </div>/* app */
  );
}

export default App;
