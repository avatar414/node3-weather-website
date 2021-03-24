import request from 'request';

export function getWeather(latitude, longitude, cb) {
    const url = `http://api.weatherstack.com/current?access_key=a16d4fc8a67b562d8d13f936accb6e9e&units=f&query=${latitude},${longitude}`;
 //   console.log(url);
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            cb({ 'error' : 'Unable to connect to weather service'},undefined);
        }
        else {
            if (body.success === false) {
                cb({'error' : body.error.info},undefined)
            }
            else {
                cb(undefined,body.current);
            }
        }
    })
}

