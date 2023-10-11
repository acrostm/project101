/// <reference types="react-scripts" />
import React, { useState, useEffect, ChangeEvent } from 'react';
import styles from '../../styles/HomeContainer.module.scss';
import axios from 'axios';

interface WeatherData {
    temperature: number;
    weatherMain: string;
}

interface TimeData {
    // Define the properties you expect in the time data.
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

function App() {
    const [weatherData, setWeatherData] = useState<WeatherData>({temperature: 0, weatherMain: ""});
    const [timeData, setTimeData] = useState<TimeData>({});
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]); // Update to an array of SearchResult
    const [searchedCity, setSearchedCity] = useState<string>("");
    const [userInfo, setUserInfo] = useState<UserInfo>({city: "Burnaby", region_name: "British Columbia", country_name: "Canada", ip: "1.1.1.1", location: {country_flag: "https://assets.ipstack.com/flags/au.svg"}}); // Update to UserInfo type

    useEffect(() => {
        getUserIP();
        handleSearchCity('Burnaby');
    }, []);

    const handleSearchCity = (city: string) => {
        if (!city) {
            return;
        }

        axios.post('/weather/getWeatherByCityName', { cityName: city })
            .then(res => {
                setWeatherData(res.data);
                console.log(weatherData);
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
                    onChange={searchLocation}
                />
            </div>
            <div className="search-results-container">
                {searchResults.length > 0 && (
                    <div className={styles['search-results-container']}>
                        {searchResults.map((result, index) => (
                            <div key={index} className={styles['search-result']} onClick={() => {
                                if (typeof result === 'string') {
                                    handleSearchCity(result.split(',')[0].trim());
                                }
                            }}>
                                {/*{result} */}
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

export default App;
