import React from 'react';
import styles from '../../styles/WeatherComponent.module.scss'; // 导入组件的样式

const WeatherComponent = ({ weatherData }) => {
    return (
        <div className={styles.weatherContainer}>
            <h1 className={styles.title}>Weather Report</h1>
            <div className={styles.weatherData}>
                <p>Temperature: {weatherData.temperature} °C</p>
                <p>Description: {weatherData.description}</p>
            </div>
        </div>
    );
};

export default WeatherComponent;
