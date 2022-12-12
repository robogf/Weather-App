// adding our weather API key
var API_KEY = "2d834a88ffafb9ee1c2d2f284b506590";
var searchHistory = [];

// function for current condition 
function getCurrentCondition(city) {
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (cityWeatherResponse) {
        console.log(cityWeatherResponse);
        var weatherIcon = cityWeatherResponse.weather[0].icon;

        var iconURL = `http://openweathermap.org/img/w/${weatherIcon}.png`;
        $("#weatherDisplay").css("display", "block");
        $("#cityWeather").empty();
        var currentCity = $(` <h2 id="currentCity">
        ${cityWeatherResponse.name} ${moment().format("MM/DD/YYYY")} <img src="${iconURL}" alt="weather icon")
        </h2> 
        <p> Temperature: ${cityWeatherResponse.main.temp} </p>
        <p> Humidity: ${cityWeatherResponse.main.humidity} </p>
        <p> Wind Speed: ${cityWeatherResponse.wind.speed} </p>
        `);
        $("#cityWeather").append(currentCity);
        

        var lat = cityWeatherResponse.coord.lat;
        var lon = cityWeatherResponse.coord.lon;
        var uvqueryURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${API_KEY}&lat=${lat}&lon=${lon}`;
        $.ajax({
            url: uvqueryURL,
            method: "GET"
        }).then(function (uvResponse) {
            console.log(uvResponse);
            var uvIndex = $(`<p> UV Index: <span id="uvIndex"> ${uvResponse.value} </span> </p>`);
            $("#cityWeather").append(uvIndex);
            

            futureForecast(lat, lon);
        }
        );
        
    }
    );
}

// function for future forecast
function futureForecast(lat,lon) {
    var futurequeryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${API_KEY}`;
    $.ajax({
        url: futurequeryURL,
        method: "GET"
    }).then(function (forecastResponse) {
        console.log(forecastResponse);
        $("#fiveForecast").empty();
        for (var i = 1; i < 6; i++) {
            var cityInfo = {
                date: forecastResponse.daily[i].dt,
                temp: forecastResponse.daily[i].temp.day,
                humidity: forecastResponse.daily[i].humidity
                
            }
            var currDate = moment.unix(cityInfo.date).format("MM/DD/YYYY");
            var iconURL = `<img src="https://openweathermap.org/img/w/${cityInfo.icon}.png" alt="${futureResponse.daily[i].weather[0].main}" />`;

            var forecastCity =  $(`
            <div class="pl-3">
                <div class="card pl-3 pt-3 mb-3 bg-dark text-light" style="width: 12rem;>
                    <div class="card-body">
                        <h5>${currDate}</h5>
                        <p>${iconURL}</p>
                        <p>Temp: ${cityInfo.temp} °F</p>
                        <p>Humidity: ${cityInfo.humidity}\%</p>
                    </div>
                </div>
            <div>
        `);
            $("#fiveForecast").append(forecastCity);
        }
    });
    
}
// add on click event listener for search button
$("#search-button").on("click", function (event) {
    event.preventDefault();
    var city = $("#search-city").val().trim();
    getCurrentCondition(city);
    searchHistory.push(city);
    var historyItem = $(`<li class="list-group
    history"> ${city} </li>`);
    $("#search-history").append(historyItem);
});


$(document).on("click", ".history", function () {
    getCurrentCondition($(this).text());
}
)
