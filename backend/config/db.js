// dev environment
let sqlConfig = {
    host: '47.254.80.146',
    user: 'root',
    password: 'zpp112004',
    database: 'project101_dev',
    port: 3306,
}

// production environment
if (process.env.NODE_ENV === 'production') {
    sqlConfig = {
        host: '47.254.80.146',
        user: 'root',
        password: 'zpp112004',
        database: 'project101_prod',
        port: 3306,
    }
}

module.exports = sqlConfig;
