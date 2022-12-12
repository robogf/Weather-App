# Weather-App

## Link to Site

![site](https://robogf.github.io/Weather-App/)

## Screenshot

![site](Screenshot%202022-12-12%20at%202.48.16%20PM.png)

## Technologies Used

JavaScript - This weather app used javascript to add functionality to our search function and displaying cards that displayed the weather
CSS- Styling for our page
HTML - Base structure for our site
BootStrap - Allowed us to add card and row styling

## summary

Through this app you are able to search a city and its current weather should display

## Code Snippet

```JavaScript
    $("#search-button").on("click", function (event) {
    event.preventDefault();
    var city = $("#search-city").val().trim();
    getCurrentCondition(city);
    searchHistory.push(city);
    var historyItem = $(`<li class="list-group
    history"> ${city} </li>`);
    $("#search-history").append(historyItem);
});
```

## Author Links

[LinkedIn](https://www.linkedin.com/in/angel-matias-01120b251/)
[GitHub] (https://github.com/robogf)
