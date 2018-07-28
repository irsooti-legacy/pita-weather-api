const axios = require('axios');
const responseType = require('../shared/jsonResponses')

const API_URL = 'https://api.wunderground.com/';
const instance = axios.create({
    baseURL: API_URL,
    headers: { 'X-Custom-Header': 'cms' }
});

instance.interceptors.response.use(responseType.convertResponseToJson, responseType.returnJsonError);


module.exports = {
    getStationById: (params) => {

        let capitalizedParams = {};

        Object.keys(params).forEach((param, index) => {
            capitalizedParams[param.toUpperCase()] = params[param];
        })

        return instance.get('weatherstation/WXCurrentObXML.asp', { params: capitalizedParams })
    }
}