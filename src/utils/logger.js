const axios = require('axios')
const os = require('os');

module.exports = (tokens, req, res) => {

    axios.post('https://pita-weather.firebaseio.com/logger.json', {
        hostname: os.hostname(),
        platform: os.platform(),
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status: tokens.status(req, res),
        length: tokens.res(req, res, 'content-length') + ' byte',
        responseTime: tokens['response-time'](req, res) + ' ms',
        request: req.headers
    })

    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')
}
