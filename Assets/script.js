$(document).ready(function() {

    function displayForecast() {
     
        $("#search").on("click", function() {

        $("#results").text("");

        var City = $("#citySearched").val();
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + City + "&units=imperial&appid=9508f5887b64149ae87a4e8e95cc981b";

        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {

            var results = response;

            var lat = results.coord.lat;
            var lon = results.coord.lon;

            var uv = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=9508f5887b64149ae87a4e8e95cc981b";

            $.ajax({
            url: uv,
            method: "GET"
            }).then(function(response) {
            var res = response;
    
           var uvIndex = $("<span>");
           uvIndex.text("UV Index: " + res.value);
           $("#results").append(uvIndex);
            });

        var wind = $("<span>");
        wind.text("Wind Speed: " + results.wind.speed + " mph");
        $("#results").prepend(wind);

        var humidity = $("<span>");
        humidity.text("Humidity: " + results.main.humidity + "%");
        $("#results").prepend(humidity);
        
        var temp = $("<span>");
        temp.text("Temperature: " + results.main.temp + "\xB0 F");
        $("#results").prepend(temp);
         
        var city = $("<span>");
        city.text(results.name + moment().format("  (MMMM Do YYYY)"));
        $("#results").prepend(city);

        // add todays date
            fiveDayForecast();
        });

        function fiveDayForecast() {
            var fiveDay = $("#forecast").val();

            var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + City + "&units=imperial&appid=9508f5887b64149ae87a4e8e95cc981b";

            $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                
            var results = response;
            
            var tomorrow = [
                moment().add(1,'days').format("YYYY-MM-DD") + " 15:00:00",
                moment().add(2,'days').format("YYYY-MM-DD") + " 15:00:00",
                moment().add(3,'days').format("YYYY-MM-DD") + " 15:00:00",
                moment().add(4,'days').format("YYYY-MM-DD") + " 15:00:00",
                moment().add(5,'days').format("YYYY-MM-DD") + " 15:00:00"
            ];
            var k = 0;

            for (let i = 0; i < results.list.length; i++) {
                if (results.list[i].dt_txt === tomorrow[k]) {
                k++; 

                var dayX = $("<div>");
                dayX.text("Teperature: " + results.list[i].main.temp_max + "\xB0 F" +
                 " \n Humidity: " + results.list[i].main.humidity + "%");
                $("#forecast").append(dayX);
    
                if (k == 5) {
                    break;
                }
                }
            }
            
                

        });

        }
    });
    }
    displayForecast()
    
});
