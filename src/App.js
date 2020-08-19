import React, { useState } from 'react';
import moment from 'moment';
import DailyForecast from './components/daily/Forecast';
import TodayForecast from './components/today/Forescast';
import HourForecast from './components/hour/Forecast';
import clockIcon from "./assets/image/clock-icon.png";

function App() {

  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  let myLocation =  (search === '') ? "las pinas" : search;

  return (
    <div className="app">
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

          <TodayForecast city={myLocation} />
        
          <HourForecast city={myLocation} />

        </div>{/* main */}

        <DailyForecast city={myLocation} />

      </div>{/* wrapper */}
    </div>/* app */
  );
}

export default App;
