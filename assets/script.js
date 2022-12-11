var weatherAPi = "2d834a88ffafb9ee1c2d2f284b506590";
var currentCity = "";
var lastCity = "";

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

// Function to get and display the current conditions for the city
var getWeather = (city) => {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + weatherAPi;
    fetch(queryURL)
        .then(handleError)
        .then(response => response.json())
        .then(data => {
            currentCity = city;
            var tempF = (data.main.temp - 273.15) * 1.80 + 32;
            $(".city").html("<h1>" + data.name + " Weather Details</h1>");
            $(".wind").text("Wind Speed: " + data.wind.speed);
            $(".humidity").text("Humidity: " + data.main.humidity);
            $(".temp").text("Temperature (F) " + tempF.toFixed(2));
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            getUVIndex(lat, lon);
            getForecast(city);
        }
        )
        .catch(error => alert("Unable to connect to OpenWeather"));
}
// Function for results to show when you click on search button
$("#search-button").on("click", function (event) {
    event.preventDefault();
    var city = $("#search-value").val();
    if (city) {
        getWeather(city);
        getForecast(city);
        $("#search-value").val("");
    }
}
)
