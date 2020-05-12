$(document).ready(function () {

    // stores current list of cities
    var currentList = [];

    // list stores local storage, store makes it into an object 
    var store = JSON.parse(localStorage.getItem("list"));

    // For every item in local storage make it a button
    if (store) {
        for (let i = 0; i < store.length; i++) {

            var cityList = $("<button>");
            cityList.text(store[i]);
            $(".cityAdded").append(cityList);
            
            // When the button is clicked on give the weather reports
            cityList.on("click", function (event) {
                var btnText = $(event.target).text();
                currentWeather(btnText);
                fiveDayForecast(btnText);
            });
        }
        // Current list includes what is in local storage, no repeate buttons.
        currentList = store.concat(currentList);
    }

    function displayForecast() {

        // When the search button is clicked adds search to the list and gives the weather. 
        $(".searchBtn").on("click", function () {
            var City = $("#citySearched").val();

            currentWeather(City);
            fiveDayForecast(City);

        });
    }
    displayForecast()

    function currentWeather(City) {

        // Clears the search results when the page is refreashed.
        $("#results").text("");
        // Keeps the header.
        $("#forecast").html("<h2>5-Day Forecast:</h2>");

        // Check if what was searched is already on the page, if not add it.
        if (!currentList.includes(City) && City !== "") {
            currentList.push(City);

            var cityList = $("<button>");
            cityList.text(City);
            $(".cityAdded").append(cityList);

            // Give the weather when one of the previous search buttons is clicked 
            cityList.on("click", function (event) {
                var btnText = $(event.target).text();
                currentWeather(btnText);
                fiveDayForecast(btnText);
            });

            // Stores current list to local storage.
            localStorage.setItem("list", JSON.stringify(currentList));
        }

        // Api to call for the current weather.
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + City + "&units=imperial&appid=9508f5887b64149ae87a4e8e95cc981b";

        // calling on the api
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var results = response;

            // getting the latitude and logitude of the city search to get the uv index.
            var lat = results.coord.lat;
            var lon = results.coord.lon;

            var uv = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=9508f5887b64149ae87a4e8e95cc981b";

            // calling to get the uv index for the current weather.
            $.ajax({
                url: uv,
                method: "GET"
            }).then(function (response) {

                var res = response;

                var uvIndex = $("<p>");
                uvIndex.text("UV Index: " + res.value);
                $("#results").append(uvIndex);

                // Making the uv index an integer so it can be color coded with the css. 
                var uvColor = parseInt(res.value);

                // Checking what class to give the uv index value, so it can be color coded.
                if (uvColor <= 2) {
                    uvIndex.attr("class", "green");
                }
                else if (uvColor == 3|| uvColor ==4|| uvColor ==5) {
                    uvIndex.attr("class", "yellow");
                }
                else if (uvColor == 6|| uvColor ==7) {
                    uvIndex.attr("class", "orange");
                }
                else if (uvColor == 8|| uvColor == 9|| uvColor == 10) {
                    uvIndex.attr("class", "red");
                }
                else {
                    uvIndex.attr("class", "violet");
                }

            });

            // The other api results for the current weather
            var wind = $("<p>");
            wind.text("Wind Speed: " + results.wind.speed + " mph");
            $("#results").prepend(wind);

            var humidity = $("<p>");
            humidity.text("Humidity: " + results.main.humidity + "%");
            $("#results").prepend(humidity);

            var temp = $("<p>");
            temp.text("Temperature: " + results.main.temp + "\xB0 F");
            $("#results").prepend(temp);

            // Gets the city name, current date, and weather icon.
            var city = $("<p>");
            city.html("<h2>" + results.name + moment().format((" (MMMM Do YYYY)") + "</h2>") + "<img src= http://openweathermap.org/img/w/" + results.weather[0].icon + ".png >");
            $("#results").prepend(city);
        });
    }

    function fiveDayForecast(City) {

        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + City + "&units=imperial&appid=9508f5887b64149ae87a4e8e95cc981b";

        // Api call to get the 5 day forecast.
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var results = response;

            // Gets the dates and same time for the next 5 days of weather from the api.
            var tomorrow = [
                moment().add(1, 'days').format("YYYY-MM-DD") + " 15:00:00",
                moment().add(2, 'days').format("YYYY-MM-DD") + " 15:00:00",
                moment().add(3, 'days').format("YYYY-MM-DD") + " 15:00:00",
                moment().add(4, 'days').format("YYYY-MM-DD") + " 15:00:00",
                moment().add(5, 'days').format("YYYY-MM-DD") + " 15:00:00"
            ];
            var k = 0;

            // Reads the api response to get the weather for the date and time.
            for (let i = 0; i < results.list.length; i++) {
                if (results.list[i].dt_txt === tomorrow[k]) {
                    k++;

                    // Gets the date, weather icon, temperature at the time above, and humidity.
                    var dayX = $("<div>");
                    dayX.attr("class", "fivForecast");
                    dayX.html(moment().add(k, 'days').format("MMMM Do YYYY") + "<img src= http://openweathermap.org/img/w/" + results.list[i].weather[0].icon + ".png >" + "<p>Temperature: " + results.list[i].main.temp_max + "\xB0 F </p>" +
                        "<p>Humidity: " + results.list[i].main.humidity + "% </p>");
                    $("#forecast").append(dayX);

                    // Stops the loop after getting the information 5 times.
                    if (k == 5) {
                        break;
                    }
                }
            }
        });
    }
});
