import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import api from '../../api/weather';
import arrIcon from "../../assets/image/arrow-icon.png";

function DailyForecast({city}) {
    const [ data, setData ] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const forecastData = await axios(`${api.base}forecast?q=${city}&units=metric&APPID=${api.key}`);
            const dailyData = forecastData.data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
          
            setData(dailyData);
        };
        
        fetchData();

      }, [city]);


    const dayFormat = time => {
        let getTime = time.split(' ');
        return moment(getTime[0]).format('dddd');
    };

    return (
        <div className="side-panel">
            <img 
                src={arrIcon} 
                alt="arrow" 
                className="arrow-icon"
            />
            <div className="daily-forecast-list">
                { data.map( (data, index) => (
                    <div className="df-list" key={index}>
                        <div className="df-iconTemp">
                            <p className="df-temp">{ Math.round(data.main.temp) }°C</p>
                            <img src={api.icon_url + data.weather[0].icon + '@2x.png'} alt="" className="df-icon"/>
                         </div>
                        <p className="df-day">{ dayFormat(data.dt_txt) }</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DailyForecast;