const cors = require('cors');

function configureCors() {
    const corsOptions = {
        origin: "*", // 允许的来源
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的HTTP方法
        allowedHeaders: 'Content-Type,Authorization', // 允许的标头
    };

    return cors(corsOptions);
}

module.exports = configureCors;
