const express = require('express');
const axios = require('axios');
const config = require('../config/keys'); // 引入配置文件
const router = express.Router();

router.get('/userIP', async (req, res, next) => {
    try {
        const ip = req.ip;
        const url = `http://api.ipstack.com/${ip}?access_key=${config.ipstackApiKey}`;
        const response = await axios.get(url);
        const data = response.data;
        res.json(data);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
