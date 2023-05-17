"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.geoCode = void 0;
const request_1 = __importDefault(require("request"));
const geoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZmlsaXAyNCIsImEiOiJjbGhkbTk2bTgwbndzM2VwY2k5MnRpeWJkIn0.NgE8wtCGjUC1HHZOvkmZjQ&limit=1";
    (0, request_1.default)({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location service', undefined);
        }
        else if (response.body.features.length === 0) {
            callback('Unable to find this location! Try differet location', undefined);
        }
        else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                place_name: response.body.features[0].place_name
            });
        }
    });
};
exports.geoCode = geoCode;
