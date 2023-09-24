import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import WeatherComponent from '../functions/WeatherFunction';
import styles from '../../styles/WeatherPage.module.scss';

import search_icon from '../../assets/images/search.png';
import cloud_icon from '../../assets/images/cloud.png';
import wind_icon from '../../assets/images/wind.png';
import humidity_icon from '../../assets/images/humidity.png';
import clear_icon from '../../assets/images/clear.png';
import rain_icon from '../../assets/images/rain.png';
import snow_icon from '../../assets/images/snow.png';
import drizzle_icon from '../../assets/images/drizzle.png';
import direction_icon from '../../assets/images/weather_icons/direction.png';

const WeatherPage = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [cityName, setCityName] = useState("Burnaby"); // 存储显示的城市名称
    const [temperature, setTemperature] = useState(""); // 存储温度
    const [windSpeed, setWindSpeed] = useState(""); // 存储风速
    const [humidity, setHumidity] = useState(""); // 存储湿度
    const [searchedCity, setSearchedCity] = useState(""); // 存储搜索框中的城市名称
    const [weatherIcon, setWeatherIcon] = useState(clear_icon); // 存储天气图标
    const [iconCode, setIconCode] = useState("01d"); // 存储天气图标代码
    const [searchResults, setSearchResults] = useState([]); // 存储搜索结果

    useEffect(() => {

        handleSearchCity(cityName);
    }, []);

    const weatherIcons = {
        '01d': clear_icon,    // 天晴
        '01n': clear_icon,   // 夜晚晴朗
        '02d': cloud_icon,  // 白天多云
        '02n': cloud_icon, // 夜晚多云
        '03d': cloud_icon,  // 白天多云
        '03n': cloud_icon, // 夜晚多云
        '04d': cloud_icon,  // 白天多云
        '04n': cloud_icon, // 夜晚多云
        '09d': drizzle_icon,  // 白天有雨
        '09n': drizzle_icon, // 夜晚有雨
        '10d': rain_icon,  // 白天有雨
        '10n': rain_icon, // 夜晚有雨
        '11d': rain_icon,  // 白天有雨
        '11n': rain_icon, // 夜晚有雨
        '13d': snow_icon,  // 白天有雪
        '13n': snow_icon, // 夜晚有雪
        '50d': cloud_icon,  // 白天多云
        '50n': cloud_icon, // 夜晚多云
    };
    const handleSearchCity = (city) => {
        if (!city) {
            return; // 如果城市名为空，不执行搜索
        }


        axios.post('/weather/getWeatherByCityName', { cityName: city })
            .then(res => {
                setTemperature(res.data.temperature);
                setWindSpeed(res.data.windSpeed);
                setHumidity(res.data.humidity);
                setCityName(city); // 更新显示的城市名称
                setSearchedCity(""); // 清空搜索框中的城市名称
                setIconCode(res.data.iconCode); // 更新天气图标代码

                // 根据后端返回的iconCode选择相应的图标文件
                const selectedIcon = weatherIcons[res.data.iconCode];
                setWeatherIcon(selectedIcon);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
        setSearchResults([]);
    }

    // handle 搜索框自动补全
    const handleInputChange = (e) => {
        const value = e.target.value;
        console.log(value);

        // 发送搜索请求
        axios.post('/searchCity', { input: value })
            .then((res) => {
                setSearchResults(res.data.cityNames); // 更新搜索结果
            })
            .catch((error) => {
                console.error('Error searching cities:', error);
            });
    };

    const getWeatherIcon = () => {
        const iconFileName = `${iconCode}.png`;
        return require(`../../assets/images/weather_icons/${iconFileName}`);
    }

    return (
        <div className={styles.container}>
            <div className={styles.topBar}>
                <input
                    className={styles['search-input']}
                    type="text"
                    placeholder="Search City"
                    value={searchedCity}
                    onChange={(e) => setSearchedCity(e.target.value)} // 更新 searchedCity
                    onInput={handleInputChange} // 添加 onInput 事件处理程序
                />
                {/*<div className={styles['search-icon']} onClick={() => handleSearchCity(searchedCity)}>*/}
                {/*    <img src={search_icon} alt="search"/>*/}
                {/*</div>*/}
            </div>
            {searchResults.length > 0 && (
                <div className={styles['search-results-container']}>
                    {searchResults.map((result, index) => (
                        <div key={index} className={styles['search-result']} onClick={() => handleSearchCity(result.split(',')[0].trim())}>
                            {result}
                        </div>
                    ))}
                </div>
            )}
            <div className={styles['weather-image']}>
                <img src={weatherIcon} alt=""/>
            </div>
            <div className={styles['weather-temp']}>{temperature}°C</div>
            <div className={styles['city-container']}>
                {(cityName === "Burnaby" || cityName === "Vancouver") && <img src={direction_icon} alt="" />}
                <div className={styles['weather-location']}>{cityName}</div>
                <img src={getWeatherIcon()} alt="" />
            </div>
            <div className={styles['data-container']}>
                <div className={styles.element}>
                    <img src={humidity_icon} alt="" className="icon"/>
                    <div className={styles.data}>
                        <div className="humidity-percentage">{humidity}%</div>
                        <div className={styles.text}>Humidity</div>
                    </div>
                </div>
                <div className={styles.element}>
                    <img src={wind_icon} alt="" className={styles.icon}/>
                    <div className={styles.data}>
                        <div className="wind-speed">{windSpeed} km/h</div>
                        <div className={styles.text}>Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherPage;
