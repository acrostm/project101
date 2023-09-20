import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherComponent from '../functions/weatherFunction';

const WeatherPage = () => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        // 发起请求获取天气数据
        axios.get('/weather/getWeather')
            .then(response => {
                setWeatherData(response.data); // 将获取的天气数据保存到状态中
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }, []);

    return (
        <div>
            <h1>Weather App</h1>
            {weatherData && <WeatherComponent weatherData={weatherData} />}
        </div>
    );
};

export default WeatherPage;
