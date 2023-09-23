const express = require('express');
const axios = require('axios');
const config = require('../config/keys'); // 引入配置文件

const router = express.Router();

// 定义获取天气数据的路由
router.get('/getWeather', async (req, res) => {
    try {
        // 使用 Axios 发起请求到 OpenWeather API
        const response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=49.22926&lon=-122.97178&appid=${config.openWeatherApiKey}`);

        // 提取所需的天气数据
        const weatherData = {
            temperature: response.data.current.temp,
            description: response.data.current.weather[0].description,
        };

        // 将天气数据发送给前端
        res.json(weatherData);
        // pug
        // res.render('weather', weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/getWeatherByCityName', async (req, res) => {
    try {
        // 使用 Axios 发起请求到 OpenWeather API
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.body.cityName}&units=Metric&appid=${config.openWeatherApiKey}`);

        // 提取所需的天气数据
        const weatherData = {
            temperature: response.data.main.temp,
            weatherMain: response.data.weather[0].main,
            windSpeed: response.data.wind.speed,
            cityName: response.data.name,
            humidity: response.data.main.humidity,
            iconCode: response.data.weather[0].icon,
        };

        // 将天气数据发送给前端
        res.json(weatherData);

    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
