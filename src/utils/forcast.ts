import request from "request";


export const forcast = (latitude: string, longitude: string, callback: Function) => {
    const url = 'http://api.weatherstack.com/current?access_key=50b2746bcb18ddb72fa951b36b8cb18d&query=' + latitude + ',' + longitude + '';

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to wheather service', undefined);
        } else if (response.body.error) {
            callback('Unable to find wheather location ', undefined)
        } else {
            callback(undefined, {
                currentWheather: response.body.current
            })
        }

    })
}