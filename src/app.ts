/**
 * Express server
 */
import path from "path";
import express from "express";
import hbs from "hbs";
import { geoCode } from "./utils/geocode";
import { forcast } from "./utils/forcast";
import IgeoCode from "../interface/geocode";
import Iwheater from "../interface/geocode";
const app = express();

// paths for express config
// /home/projects/wapp/src + ../public
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../public/templates/views");
const partialPath = path.join(__dirname, "../public/templates/partials");
const port = process.env.PORT || 3000;
// set up hbs view engine engine
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);
// set up static views
app.use(express.static(publicDirectory));

// index route
app.get("", (req: express.Request, res: express.Response) => {
  res.render("index", {
    indexTitle: "Weather App",
    name: "Filip",
  });
});

// about route
app.get("/about", (req: express.Request, res: express.Response) => {
  res.render("about", {
    aboutTitle: "About Page",
    name: "Filip",
  });
});

// help route
app.get("/help", (req: express.Request, res: express.Response) => {
  res.render("help", {
    helpTitle: "Help Page",
    helpText: "How can we help you ?",
    name: "Filip",
  });
});
// --- endpoints ---
// wheather endpoint
app.get("/weather", (req: express.Request, res: express.Response) => {
  if (!req.query.address) {
    return res.send({
      error: "Must provide an address!",
    });
  }
  const address = JSON.stringify(req.query.address);

  geoCode(address, (error: string, geoData: IgeoCode) => {
    if (error) {
      return res.send({ error: JSON.stringify(error) });
    }

    forcast(
      geoData.latitude,
      geoData.longitude,
      (error: string, focastData: Iwheater) => {
        if (error) {
          return res.send({ error: error });
        }
        res.send({
          forcast: focastData.currentWheather.weather_descriptions[0] + 
          ". It is currently " + focastData.currentWheather.temperature + " degrees out. It feels like " +
          focastData.currentWheather.feelslike + " degress out. The humidity is " + focastData.currentWheather.humidity + "%." ,
          location: geoData.place_name,
          address: req.query.address,
        });
      }
    );
  });
});

// non registerd routes
app.get("*", (req: express.Request, res: express.Response) => {
  res.render("404", {
    errorMessage: "Sorry page does not exist",
  });
});
// port
app.listen(port, () => {
  console.log("Server started on port " + port);
});
