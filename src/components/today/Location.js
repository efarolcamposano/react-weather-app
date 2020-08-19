import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import api from '../../api/weather';

function Location({ city }){
    const [ weather, setWeather ] = useState({ windSpeed: {}, cityName: {}, country: {} });

    useEffect(() => {
        const fetchData = async () => {
            const weatherData = await axios(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`);
          
            setWeather({
                windSpeed: weatherData.data.wind,
                cityName: weatherData.data,
                country: weatherData.data.sys
            }); 
        };
        
        fetchData();

      }, [city]);

    return (
        <div className="col-lg-12">
            <div className="top">
                <h1 className="location">{weather.cityName.name}, <span className="accent-color">{weather.country.country}</span></h1>
                <div className="current-date">{moment().format('dddd, Do MMMM YYYY')}</div>
            </div>
        </div>
    );
}

export default Location;