const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/be582c6ecc1f05124825f8c92ca8b74f/${lat},${long}`;

    request({url, json: true}, (err, {body}) => {
        if (err) {
            callback('Unable to connect to weather service.', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, {
                temperature: body.currently.temperature,
                precipitation: body.currently.precipProbability
            })
        };
    })   
};

module.exports = forecast;
