module.exports = {
    mysql: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'tpm_database'
    },
    redis: {
        port: 6379,
        host: '127.0.0.1',
        family: 4,
        db: 0
    },
    port: 9000,
    url_prefix: '/api'
}

exports = module.exports;