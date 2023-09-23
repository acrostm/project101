const express = require('express');
const axios = require('axios');
const config = require('../config/keys'); // 引入配置文件

const router = express.Router();

// 定义获取天气数据的路由
router.post('/', async (req, res) => {
    try {
        // 使用 Axios 发起请求到 Google Map Autocomplete API
        console.log(req.body.input);
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.body.input}&types=(cities)&key=${config.googleMapPlatformApiKey}`);
        console.log(response.data);
        // 提取所需的城市数据
        const cityNames = response.data.predictions.map((prediction) => prediction.description);
        const cityData = {
            cityNames: cityNames,
        };

        // 将天气数据发送给前端
        res.json(cityData);
        console.log(cityData);

    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
