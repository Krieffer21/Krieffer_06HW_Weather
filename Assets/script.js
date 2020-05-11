$(document).ready(function () {

    var currentList = [];

    var store = JSON.parse(localStorage.getItem("list"));

    if (store) {
        for (let i = 0; i < store.length; i++) {

            var cityList = $("<button>");
            cityList.text(store[i]);
            $(".cityAdded").append(cityList);

            cityList.on("click", function (event) {
                var btnText = $(event.target).text();
                currentWeather(btnText);
                fiveDayForecast(btnText);
            });
        }
        currentList = store.concat(currentList);
    }

    function displayForecast() {

        $(".searchBtn").on("click", function () {
            var City = $("#citySearched").val();

            currentWeather(City);
            fiveDayForecast(City);

        });
    }
    displayForecast()

    function currentWeather(City) {

        $("#results").text("");
        $("#forecast").html("<h2>5-Day Forecast:</h2>");

        if (!currentList.includes(City) && City !== "") {
            currentList.push(City);

            var cityList = $("<button>");
            cityList.text(City);
            $(".cityAdded").append(cityList);

            cityList.on("click", function (event) {
                var btnText = $(event.target).text();
                currentWeather(btnText);
                fiveDayForecast(btnText);
            });

            localStorage.setItem("list", JSON.stringify(currentList));
        }

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + City + "&units=imperial&appid=9508f5887b64149ae87a4e8e95cc981b";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var results = response;

            var lat = results.coord.lat;
            var lon = results.coord.lon;

            var uv = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=9508f5887b64149ae87a4e8e95cc981b";

            $.ajax({
                url: uv,
                method: "GET"
            }).then(function (response) {

                var res = response;

                var uvIndex = $("<p>");
                uvIndex.text("UV Index: " + res.value);
                $("#results").append(uvIndex);
            });

            var wind = $("<p>");
            wind.text("Wind Speed: " + results.wind.speed + " mph");
            $("#results").prepend(wind);

            var humidity = $("<p>");
            humidity.text("Humidity: " + results.main.humidity + "%");
            $("#results").prepend(humidity);

            var temp = $("<p>");
            temp.text("Temperature: " + results.main.temp + "\xB0 F");
            $("#results").prepend(temp);

            var city = $("<p>");
            city.html(results.name + moment().format("  (MMMM Do YYYY)") + "<img src= http://openweathermap.org/img/w/" + results.weather[0].icon + ".png >");
            $("#results").prepend(city);

        });
    }

    function fiveDayForecast(City) {

        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + City + "&units=imperial&appid=9508f5887b64149ae87a4e8e95cc981b";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var results = response;

            var tomorrow = [
                moment().add(1, 'days').format("YYYY-MM-DD") + " 15:00:00",
                moment().add(2, 'days').format("YYYY-MM-DD") + " 15:00:00",
                moment().add(3, 'days').format("YYYY-MM-DD") + " 15:00:00",
                moment().add(4, 'days').format("YYYY-MM-DD") + " 15:00:00",
                moment().add(5, 'days').format("YYYY-MM-DD") + " 15:00:00"
            ];
            var k = 0;

            for (let i = 0; i < results.list.length; i++) {
                if (results.list[i].dt_txt === tomorrow[k]) {
                    k++;

                    var dayX = $("<div>");
                    dayX.attr("class", "fivForecast");
                    dayX.html(moment().add(k, 'days').format("MMMM Do YYYY") + "<img src= http://openweathermap.org/img/w/" + results.list[i].weather[0].icon + ".png >" + "<p>Temperature: " + results.list[i].main.temp_max + "\xB0 F </p>" +
                        "<p>Humidity: " + results.list[i].main.humidity + "% </p>");
                    $("#forecast").append(dayX);

                    if (k == 5) {
                        break;
                    }
                }
            }

        });

    }

});
