const request = require('request');

weather = (latitude, logitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=f2dd6ed085187e24e4482f0cda7d1902&query=${encodeURIComponent(latitude)},${encodeURIComponent(logitude)}&units=m`;

    request({url, json: true}, (error, response, {error:bodyError, current}={}) => {

        if(error){
            console.error(error);
            callback('Unable to connect to weather service!', undefined);
        }else if(bodyError){
            console.error(bodyError.info);
            callback(bodyError.info, undefined)
        }else{
            callback(undefined, `${current.weather_descriptions[0]}. It's currently ${current.temperature} degress out. Is feels like ${current.feelslike} degress out.`);
        }
    });
};

module.exports = weather;