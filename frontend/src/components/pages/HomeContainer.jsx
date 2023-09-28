import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styles from '../../styles/HomeContainer.module.scss';
import axios from 'axios'

function App() {
    const [weatherData, setWeatherData] = useState({}); // store weather data
    const [timeData, setTimeData] = useState({}); // store time data
    const [searchResults, setSearchResults] = useState([]); // 存储搜索结果
    const [searchedCity, setSearchedCity] = useState(""); // 存储显示的城市名称
    const [userInfo, setUserInfo] = useState(""); // 存储用户IP



    useEffect(() => {
        getUserIP();
        handleSearchCity('Burnaby');
    }, []);



    const handleSearchCity = (city) => {
        if (!city) {
            return; // 如果城市名为空，不执行搜索
        }


        axios.post('/weather/getWeatherByCityName', {cityName: city})
            .then(res => {
                setWeatherData(res.data);
                console.log(weatherData);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });

        setSearchResults([]); // close the dropdown
        setSearchedCity(""); // 清空搜索框中的城市名称
    }
    const searchLocation = (e) => {
        const value = e.target.value;

        // 发送搜索请求
        axios.post('/searchCity', { input: value })
            .then((res) => {
                setSearchResults(res.data.cityNames); // 更新搜索结果
            })
            .catch((error) => {
                console.error('Error searching cities:', error);
            });
    };

    const getUserIP = async () => {
        await axios.get('/userInfo/userIP')
            .then(res => {
                setUserInfo(res.data);
            })
            .catch(error => {
                console.error('Error fetching user IP:', error);
            });
    }


    return (
        <div className={styles.app}>
            <div className={styles.search}>
                <input
                    className={styles['search-input']}
                    type="text"
                    placeholder="Search City"
                    value={searchedCity}
                    onChange={(e) => setSearchedCity(e.target.value)} // 更新 searchedCity
                    onInput={searchLocation} // 添加 onInput 事件处理程序
                />
            </div>
            <div className="search-results-container">
                {searchResults.length > 0 && (
                    <div className={styles['search-results-container']}>
                        {searchResults.map((result, index) => (
                            <div key={index} className={styles['search-result']} onClick={() => handleSearchCity(result.split(',')[0].trim())}>
                                {result}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.temp}>
                        <p>Local {weatherData.temperature} °C</p>
                    </div>
                    <div className={styles.line}></div>
                    <div className={styles.location}>
                        {userInfo.city && <h1>{userInfo.city}, {userInfo.region_name} {userInfo.country_name}</h1>}
                        <p className={styles.bold}>Location</p>
                    </div>
                    <div className={styles.description}>
                        {weatherData.weatherMain ? <p>{weatherData.weatherMain}</p> : null}
                    </div>
                </div>
                <div className={styles.bottom_container}>
                    <div className={styles.bottom}>
                        <div className={styles.ip}>
                            <p>{userInfo.ip}</p>
                            <p className={styles.bold}>IP Address</p>
                        </div>
                        <div className={styles.emoji}>
                            <img src={userInfo.country_flag}  alt={`country flag`} />
                            <p className={styles.bold}>Internet Service Provider</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
