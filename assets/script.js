var weatherAPi = "2d834a88ffafb9ee1c2d2f284b506590";
var currentCity = "";
var lastCity = "";
var cityList = [];
// Function for getting the current date
var getDate = () => {
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    return month + "/" + day + "/" + year;
}

// Function for error handling
var handleError = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
    }

// Function for getting the weather
var getWeather = (city) => {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + weatherAPi;
    fetch(queryURL)
        .then(handleError)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            currentCity = data.name;
            $("#city").text(data.name);
            $("#temp").text("Temperature: " + data.main.temp);
            $("#humidity").text("Humidity: " + data.main.humidity);
            $("#wind").text("Wind Speed: " + data.wind.speed);
            getUVIndex(data.coord.lat, data.coord.lon);
            getForecast(city);
        }
        )
        .catch(error => console.log(error));
}
// Function for getting the UV Index