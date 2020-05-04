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

        //    var uvIndex = $("<span>");
        //    uvIndex.text("UV Index: " + );
        //    $("#results").append(uvIndex);

        var wind = $("<span>");
        wind.text("Wind Speed: " + results.wind.speed);
        $("#results").prepend(wind);

        var humidity = $("<span>");
        humidity.text("Humidity: " + results.main.humidity);
        $("#results").prepend(humidity);
        
        // put results in f
        var temp = $("<span>");
        temp.text("Temperature: " + results.main.temp);
        $("#results").prepend(temp);
         
        var city = $("<span>");
        city.text(results.name);
        $("#results").prepend(city);

        // add todays date
            fiveDayForecast()
        });

        function fiveDayForecast() {

            var fiveDay = $("#forecast").val();
            var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + City + "&units=imperial&appid=9508f5887b64149ae87a4e8e95cc981b";

            $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                
            var results = response;

            // var dayOne = $("<span>");
            // wind.text("Wind Speed: " + results.wind.speed);
            // $("#results").prepend(wind);
    
        }

        });
    }
    displayForecast()
});
