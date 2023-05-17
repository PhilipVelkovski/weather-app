import request from "request";
export const geoCode = (address: string, callback: Function) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZmlsaXAyNCIsImEiOiJjbGhkbTk2bTgwbndzM2VwY2k5MnRpeWJkIn0.NgE8wtCGjUC1HHZOvkmZjQ&limit=1";

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location service', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find this location! Try differet location', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                place_name: response.body.features[0].place_name
            })
        }

    })
}