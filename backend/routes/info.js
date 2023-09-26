const express = require('express');
const axios = require('axios');
const config = require('../config/keys'); // 引入配置文件
const router = express.Router();

router.get('/userIP', async (req, res, next) => {
    try {
        const ip = await axios.get(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${config.ipifyApiKey}`);
        res.json(ip.data);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
