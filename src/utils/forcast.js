"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forcast = void 0;
const request_1 = __importDefault(require("request"));
const forcast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=50b2746bcb18ddb72fa951b36b8cb18d&query=' + latitude + ',' + longitude + '';
    (0, request_1.default)({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to wheather service', undefined);
        }
        else if (response.body.error) {
            callback('Unable to find wheather location ', undefined);
        }
        else {
            callback(undefined, {
                currentWheather: response.body.current
            });
        }
    });
};
exports.forcast = forcast;
