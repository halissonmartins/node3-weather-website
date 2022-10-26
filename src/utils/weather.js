const request = require('request');

weather = (latitude, logitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=dac24f0d5737735b1f7a169f77d0f8a9&query=${encodeURIComponent(latitude)},${encodeURIComponent(logitude)}&units=m`;

    request({url, json: true}, (error, response, {error:bodyError, current}={}) => {

        if(error){
            console.error(error);
            callback('Unable to connect to weather service!', undefined);
        }else if(bodyError){
            console.error(bodyError.info);
            callback(bodyError.info, undefined)
        }else{
            callback(undefined, `${current.weather_descriptions[0]}. It's currently ${current.temperature} degress out. Is feels like ${current.feelslike} degress out. The humidity is ${current.humidity}%.`);
        }
    });
};

module.exports = weather;