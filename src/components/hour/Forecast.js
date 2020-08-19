import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import Slider from 'react-slick';
import api from '../../api/weather';
import clockIcon from '../../assets/image/clock-icon.png';

function HourForecast({ city }) {
    const [ data, setData ] = useState([]);

    useEffect( () => {
      const fetchData = async () => {

        const forecastData = await axios(`${api.base}forecast?q=${city}&units=metric&APPID=${api.key}`);
        const hourlyData = forecastData.data.list.filter( reading => reading.dt_txt.includes( moment().format('YYYY-MM-DD') ));

        setData(hourlyData)

      }

      fetchData();

    }, [city])

    const timeFormat = time => {
      let getTime = time.split(' ');
      return moment(getTime[1], 'HH:mm:ss').format('h a');
    };

    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1
    };

    return (
        <div className="bottom container-fluid">
          <div className="row">

            <div className="col-md-2 d-none d-md-block">
              <div className="time-container">
                <img src={clockIcon} alt="" className="clock-icon"/>
                <span>{ moment().format('h:mm a') }</span>
              </div>
            </div>

            <div className="col-md-10">
              <div className="slick-container clearfix">

              <Slider {...settings}>
                {data.map( (reading, index) => (
                  <div key={index}>
                      <p className="hour-date">{timeFormat(reading.dt_txt)}</p>
                      <img src={api.icon_url+reading.weather[0].icon+'@2x.png'} alt=""/>
                      <p className="hour-temp">{Math.round(reading.main.temp)}°C</p>
                  </div>
                ))}
              </Slider>
              
              </div>
            </div>
            
          </div>
        </div>
    );
}

export default HourForecast;