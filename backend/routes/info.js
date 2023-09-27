const express = require('express');
const axios = require('axios');
const config = require('../config/keys'); // 引入配置文件
const router = express.Router();
const os = require('os'); // 导入Node.js的os模块

router.get('/userIP', async (req, res, next) => {
    try {
        const ip = req.ip;
        const originalIP = req.ip;

        // 使用os模块的networkInterfaces方法来识别IPv4地址
        const networkInterfaces = os.networkInterfaces();
        let ipv4Address = '';

        // 遍历网络接口
        Object.keys(networkInterfaces).forEach((key) => {
            networkInterfaces[key].forEach((interface) => {
                if (interface.family === 'IPv4' && !interface.internal) {
                    ipv4Address = interface.address;
                }
            });
        });

        const url = `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${config.ipifyApiKey}&ipAddress=${ipv4Address}`;
        const response = await axios.get(url);
        const data = response.data;
        res.json(data);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
