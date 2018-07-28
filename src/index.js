const services = require('./services');
const cors = require('cors');
const stringify = require('json-stringify-safe');
var express = require('express')
var app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const logger = require('./utils/logger')
dotenv.load()


app.use(cors({ origin: true }), morgan(logger))

const wunderground = (request, response, next) => {
    const params = request.query
    const srvc = services.wunderground.getStationById(params);
    // eq: weatherstation/WXCurrentObXML.asp?ID=ISIASSOR2
    srvc.then(_response => {
            return response
                .status(_response.status)
                .send(stringify(_response.data))
        })
        .catch(reason => {
            return response
                .status(500)
                .send(stringify(reason))
        })
}


app.get('/', wunderground)

app.listen(process.env.PORT, () => console.log('Example app listening on port ' + process.env.PORT))