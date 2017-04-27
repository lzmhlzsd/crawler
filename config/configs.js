module.exports = {
    mysql: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'crawler'
    },
    redis: {
        port: 6379,
        host: '127.0.0.1',
        family: 4,
        db: 0
    },
    port: 9000,
    debug: true,
    url_prefix: '/api'
}

exports = module.exports;