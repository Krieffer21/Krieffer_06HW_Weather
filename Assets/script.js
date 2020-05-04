$(document).ready(function() {

    function displayForecast() {
     
        $("button").on("click", function() {

        var City = $(this).attr("{city ID}");
        var queryURL = "api.openweathermap.org/data/2.5/forecast?q=" + City + "&appid=9508f5887b64149ae87a4e8e95cc981b";

        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {

            var results = response.data;
            for (var i = 0; i < results.length; i++) {

            var city = $("results").attr("src", results[i].city.name);

            var date =$("results").attr("src", results[i].list.dt_txt);

            // put results in f
           var temp = $("results").attr("src", results[i].list.main.temp_kf);

           var humidity = $("results").attr("src", results[i].list.main.humidity);

           var windSpeed = $("results").attr("src", results[i].list.wind.speed);

           var uvIndex = $("results").attr("src", results[i].city);

           var forecast = $("fiveDay").attr("src", results[i] );
            }

        });

        });
    }
});
