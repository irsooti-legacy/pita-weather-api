const convert = require('fast-xml-parser');

const convertResponseToJson = (response) => {
    response.data = convert.parse(response.data)

    return response;
}

const returnJsonError = (error) => {
    return { error }
}

const defaultJsonError = (error) => {
    return Promise.reject(error);
}

module.exports = {
    convertResponseToJson,
    returnJsonError,
    defaultJsonError
}