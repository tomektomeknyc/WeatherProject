const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function (req, res){

	res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
	console.log(req.body.cityName);

	 const query = req.body.cityName;
	 const apiKey ="f835c2837d725cb90b713ded787a060d";
	 const unit = "metric"
	 const url ="https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid=" + apiKey + "&units=" + unit;

	 https.get(url, function(response) {
	 console.log(response.statusCode);


	 response.on("data", function (data) {
	 // data is in hexadecimal format so JSON.parse turns it into readable
	 const weatherData = JSON.parse(data)
	 const temp = weatherData.main.temp
	 const weatherDescription = weatherData.weather[0].description
	 //04n - the image name in JSON weather
	 const icon = weatherData.weather[0].icon

	 const imageURL = "http://openweathermap.org/img/wn/04n@2x.png"
	 console.log(weatherData);
	 console.log(weatherDescription);
	 res.write("<p>The weather is currently " + weatherDescription+"<p>")
	 res.write("<h1>The temperature in "+ query+ " is " + temp+ " degrees Celcius.</h1>");
	 res.write("<img src=" + "http://openweathermap.org/img/wn/04n@2x.png" + ">");
	 res.send()
	 })
	 })



})


app.listen(3000, function(){
	console.log("Server is running on port 3000");
})
