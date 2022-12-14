const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaGFsaXNzb25tYXJ0aW5zIiwiYSI6ImNsOWhybzVrMjBndHg0MXAyeTFjd2xkdWcifQ.ISlvGTl0vi7Dl6zDBmog3Q&limit=1`;

    request({url, json: true}, (error, response, {features}={}) => {

        if(error){
            console.error(error);
            callback('Unable to connect to weather service.', undefined);
        }else if(features.length === 0){
            callback('Unable to find location, try another search.', undefined);
        }else{
            const latitude = features[0].center[1];
            const longitude = features[0].center[0];
            const location = features[0].place_name

            callback(undefined, {
                latitude,
                longitude,
                location,
            });
        }
    });
};

module.exports = geocode;