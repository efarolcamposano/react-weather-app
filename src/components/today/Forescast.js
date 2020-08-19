import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../api/weather';
import Location from './Location';

function TodayForescast({ city }) {
    const [ data, setData ] = useState({ main: {}, weather: {}, wind: {} });
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
        setIsLoading(true);

            const weatherData = await axios(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`);
          
            setData({
                main: weatherData.data.main,
                weather: weatherData.data.weather[0],
                wind: weatherData.data.wind
            });

        setIsLoading(false);
        };
        
        fetchData();
        
      }, [city]);

    return (
    <React.Fragment>

        {isLoading ? ( <div class="loading-container"><div class="loading">Loading...</div></div> ) : "" }

        <Location city={city} />
        
        <div className="container">
            <div className="row">
                <div className="today-weather col-md-4">
                {(typeof data.weather.icon != "undefined") ? (
                    <img src={`http://openweathermap.org/img/wn/${data.weather.icon}@4x.png`}  alt="weather icon"  />
                ) : ('')}
                    <div className="today-temp accent-color">{Math.round(data.main.temp) }°C </div>
                    <div className="temp-desc">{data.weather.description}</div>
                </div>

                <div className="weather-info col-md-8">
                    <div className="row">
                        <div className="col">
                            <div className="wi-list">
                                <p>Humidity</p>
                                <p className="wi-data">{data.main.humidity}%</p>
                            </div>
                            <div className="wi-list">
                                <p>Air Pressure</p>
                                <p className="wi-data">{data.main.pressure} hPa</p>
                            </div>
                        </div>
                        <div className="col">
                            <div className="wi-list">
                                <p>Feels like</p>
                                <p className="wi-data">{Math.round(data.main.feels_like) }°C </p>
                            </div>
                            <div className="wi-list">
                                <p>Wind Speed</p>
                                <p className="wi-data">{Math.round(data.wind.speed * 3.6)} km/h</p>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    </React.Fragment>
    );
}

export default TodayForescast;