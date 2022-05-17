const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/weather", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const city_name = req.body.city;
  const apiKey = "4dd96710b9d014dbaea77b49cbc7812a";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city_name +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;
  https.get(url, function (response) {
    console.log(response);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      const weatherDescription = weatherData.weather[0].description;
      console.log(weatherData);

      res.write("<h1>Weather in " + city_name + "</h1>");
      res.write("<h2>Current temperature: " + temp + "</h2>");
      res.write("<img src=" + imageUrl + ">");
      res.write("<p>" + weatherDescription + "</p>");
      res.send();
    });
  });
});

app.get("/forecast", (req, res) => {
  const url =
    "https://api.openweathermap.org/data/2.5/forecast/daily?q=" +
    city_name +
    "&cnt=5&appid=a83edd9bbc992c06fecfcf91ce15d0aa";

  https.get(url, (response) => {
    response.on("data", (data) => {
      const forecastData = JSON.parse(data);
      console.log(forecastData);
      res.send();
    });
  });
});

app.listen(3001, function () {
  console.log("Server is running on port 3000");
});
