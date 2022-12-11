// adding our weather API key
const API_KEY = "2d834a88ffafb9ee1c2d2f284b50659b0";
var currentCity = "";
// document selectors needed for the weather app


//eror handling function
function HandleError(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
// function to get and display the current conditons 
var getCurrentConditions = (event) => {
   let city = $('#search-city').val();
    currentCity = city;
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + API_KEY;
    fetch(queryURL)
        .then(HandleError)
        .then((response) => {
            return response.json();
        })
        .then((repsonse) => {
            // save the data to local storage
            localStorage.setItem("currentCity", JSON.stringify(repsonse));
            // display the current conditions
            displayCurrentConditions(repsonse);
        }
        )
        .catch((error) => {
            console.log(error);
        }
        )
}
// function to display the current conditions
var displayCurrentConditions = (response) => {
    // get the current date
    let currentDate = moment().format('L');
    // get the city name
    let cityName = response.name;
    // get the icon code
    let iconCode = response.weather[0].icon;
    // get the icon url
    let iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
    // get the temperature
    let tempF = (response.main.temp - 273.15) * 1.80 + 32;
    // get the humidity
    let humidity = response.main.humidity;
    // get the wind speed
    let windSpeed = response.wind.speed;
    // get the latitude
    let lat = response.coord.lat;
    // get the longitude
    let lon = response.coord.lon;
    // get the UV index
    let queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + API_KEY + "&lat=" + lat + "&lon=" + lon;
    fetch(queryURL)
        .then(HandleError)
        .then((response) => {
            return response.json();
        }
        )
        .then((response) => {
            let uvIndex = response.value;
            // display the current conditions
            $('#current-city').html(cityName + " (" + currentDate + ") " + "<img src=" + iconURL + ">");
            $('#temperature').text("Temperature: " + tempF.toFixed(2) + " °F");
            $('#humidity').text("Humidity: " + humidity + "%");
            $('#wind-speed').text("Wind Speed: " + windSpeed + " MPH");
            $('#uv-index').text("UV Index: " + uvIndex);
        }
        )
        .catch((error) => {
            console.log(error);
        }
        )
}
// function to get and display the 5 day forecast
var getFiveDayForecast = (event) => {
    let city = $('#search-city').val();
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + API_KEY;
    fetch(queryURL)
        .then(HandleError)
        .then((response) => {
            return response.json();
        }
        )
        .then((response) => {
            // save the data to local storage
            localStorage.setItem("fiveDayForecast", JSON.stringify(response));
            // display the 5 day forecast
            displayFiveDayForecast(response);
        }
        )
        .catch((error) => {
            console.log(error);
        }
        )
}
// function to display the 5 day forecast
var displayFiveDayForecast = (response) => {
    // clear the old content
    $('#five-day-forecast').empty();
    // loop over all the forecasts (every 8th element)
    for (let i = 0; i < response.list.length; i += 8) {
        // get the date
        let date = response.list[i].dt_txt;
        // get the icon code
        let iconCode = response.list[i].weather[0].icon;
        // get the icon url
        let iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
        // get the temperature
        let tempF = (response.list[i].main.temp - 273.15) * 1.80 + 32;
        // get the humidity
        let humidity = response.list[i].main.humidity;
        // create the html elements for a bootstrap card
        let col = $('<div>').addClass('col-md-2');
        let card = $('<div>').addClass('card bg-primary text-white');
        let body = $('<div>').addClass('card-body p-2');
        let title = $('<h5>').addClass('card-title').text(date);
        let img = $('<img>').attr('src', iconURL);
        let p1 = $('<p>').addClass('card-text').text("Temp: " + tempF.toFixed(2) + " °F");
        let p2 = $('<p>').addClass('card-text').text("Humidity: " + humidity + "%");
        // merge together and put on page
        col.append(card.append(body.append(title, img, p1, p2)));
        $('#five-day-forecast').append(col);
    }
}
// function to get the current city from local storage
var getCurrentCity = () => {
    // get the current city from local storage
    let currentCity = JSON.parse(localStorage.getItem("currentCity"));
    // display the current conditions
    displayCurrentConditions(currentCity);
    // get the 5 day forecast
    getFiveDayForecast();
}
// function to get the 5 day forecast from local storage
var getFiveDayForecast = () => {
    // get the 5 day forecast from local storage
    let fiveDayForecast = JSON.parse(localStorage.getItem("fiveDayForecast"));
    // display the 5 day forecast
    displayFiveDayForecast(fiveDayForecast);
}
// function to get the search history from local storage
var getSearchHistory = () => {
    // get the search history from local storage
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
    // if the search history is null, create a new array
    if (searchHistory === null) {
        searchHistory = [];
    }
    // display the search history
    displaySearchHistory(searchHistory);
}
// function to display the search history
var displaySearchHistory = (searchHistory) => {
    // clear the old content
    $('#search-history').empty();
    // loop over all the cities
    for (let i = 0; i < searchHistory.length; i++) {
        // create the html elements for a list item
        let li = $('<li>').addClass('list-group`).text(searchHistory[i]);
        // merge together and put on page
        $('#search-history').append(li);
    }
}
// function to add a new city to the search histor