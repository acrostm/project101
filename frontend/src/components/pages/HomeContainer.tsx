/// <reference types="react-scripts" />
import React, { useState, useEffect, ChangeEvent } from 'react';
import styles from '../../styles/HomeContainer.module.scss';
import axios from 'axios';
import RealTimeClock from "../functions/RealTime";

interface WeatherData {
    temperature: number;
    weatherMain: string;
}

interface SearchResult {
    // Define the properties you expect in a search result.
}

interface UserInfo {
    city: string;
    region_name: string;
    country_name: string;
    ip: string;
    location: {
        country_flag: string;
    }
}

function Home() {
    const [weatherData, setWeatherData] = useState<WeatherData>({temperature: 0, weatherMain: ""});
    const [searchResults, setSearchResults] = useState<string[]>([]); // Update to an array of SearchResult
    const [searchedCity, setSearchedCity] = useState<string>("");
    const [currentCity, setCurrentCity] = useState<string>("");
    const [userInfo, setUserInfo] = useState<UserInfo>(
        {
            city: "Burnaby",
            region_name: "British Columbia",
            country_name: "Canada",
            ip: "1.1.1.1",
            location: {country_flag: "https://assets.ipstack.com/flags/us.svg"}
        }); // Update to UserInfo type

    useEffect(() => {
        getUserIP().then(r => {});
        handleSearchCity('Burnaby');
    }, []);

    const handleSearchCity = (city: string) => {
        if (!city) {
            return;
        }
        setCurrentCity(city);
        axios.post('/weather/getWeatherByCityName', { cityName: city })
            .then(res => {
                setWeatherData(res.data);
                // console.log(weatherData);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });

        setSearchResults([]);
        setSearchedCity("");
    };

    const searchLocation = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        axios.post('/searchCity', { input: value })
            .then((res) => {
                setSearchResults(res.data.cityNames);
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
                    onInput={searchLocation}
                />
            </div>
            <div className="search-results-container">
                {searchResults.length > 0 && (
                    <div className={styles['search-results-container']}>
                        {searchResults.map((result, index) => (
                            <div key={index} className={styles['search-result']} onClick={() => {
                                handleSearchCity(result.split(',')[0].trim());
                            }}>
                                {result}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className={styles.time}>
                <RealTimeClock/>
            </div>
            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.temp}>
                        {currentCity !== "Burnaby" && <p>{currentCity} {weatherData.temperature} °C</p>}
                        {currentCity === "Burnaby" && <p>Local {weatherData.temperature} °C</p>}
                    </div>
                    <div className={styles.line}></div>
                    <div className={styles.location}>
                        {userInfo.city && <h1>{userInfo.city}, {userInfo.region_name} {userInfo.country_name} </h1>}
                    </div>
                    <div className={styles.description}>
                        {weatherData.weatherMain ? <p>{weatherData.weatherMain}</p> : null}
                    </div>
                </div>
                <div className={styles.bottom_container}>
                    <div className={styles.bottom}>
                        <div className={styles.ip}>
                            <p>{userInfo?.ip}</p>
                            <p className={styles.mark}>IP Address</p>
                        </div>
                        <div className={styles.flag_container}>
                            <img className={styles.flag} src={userInfo.location.country_flag}  alt={"country flag"} />
                            <p className={styles.mark}>Country Flag</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
