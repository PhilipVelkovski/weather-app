"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Express server
 */
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const hbs_1 = __importDefault(require("hbs"));
const geocode_1 = require("./utils/geocode");
const forcast_1 = require("./utils/forcast");
const app = (0, express_1.default)();
// paths for express config
// /home/projects/wapp/src + ../public
const publicDirectory = path_1.default.join(__dirname, "../public");
const viewsPath = path_1.default.join(__dirname, "../public/templates/views");
const partialPath = path_1.default.join(__dirname, "../public/templates/partials");
const port = process.env.PORT || 3000;
// Set up hbs engine
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs_1.default.registerPartials(partialPath);
// set up static views
app.use(express_1.default.static(publicDirectory));
// index route
app.get("", (req, res) => {
    res.render("index", {
        indexTitle: "Wheather App",
        name: "Filip",
    });
});
// about route
app.get("/about", (req, res) => {
    res.render("about", {
        aboutTitle: "About Page",
        name: "Filip",
    });
});
// help route
app.get("/help", (req, res) => {
    res.render("help", {
        helpTitle: "Help Page",
        helpText: "How can we help you ?",
        name: "Filip",
    });
});
// --- endpoints ---
// wheather endpoint
app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Must provide an address!",
        });
    }
    const address = JSON.stringify(req.query.address);
    (0, geocode_1.geoCode)(address, (error, geoData) => {
        if (error) {
            return res.send({ error: JSON.stringify(error) });
        }
        (0, forcast_1.forcast)(geoData.latitude, geoData.longitude, (error, focastData) => {
            if (error) {
                return res.send({ error: error });
            }
            res.send({
                forcast: focastData.currentWheather.weather_descriptions[0],
                location: geoData.place_name,
                address: req.query.address,
            });
        });
    });
});
// non registerd routes
app.get("*", (req, res) => {
    res.render("404", {
        errorMessage: "Sorry page does not exist",
    });
});
app.listen(port, () => {
    console.log("Server started on port " + port);
});
