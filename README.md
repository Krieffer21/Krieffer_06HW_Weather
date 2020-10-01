# Krieffer_WeatherApp

## Weather Api
  This assigment was to create a weather application that gives todays weather along with the forecast for the next 5 days. The user is able to search for a city and see the weather results, and click on prior searches. The cities the user searches for needed to be saved to local storage. I used the openweather api and moment.js, a time/ date library, to get the required information needed. 

### UV Index
  In order to get the UV index for the current weather you need the longitude and latitude of the city when calling on the UV index api. (Shown in first screenshot) When getting the UV index we also need to color code it depending on the severity. By making the result of the UV index into an integer it can be checked in the following "if" statements to set the proper class and get the right color through css styling.
  
![](https://github.com/Krieffer21/Krieffer_06HW_Weather/blob/master/images/UvIndex1.png)
![](https://github.com/Krieffer21/Krieffer_06HW_Weather/blob/master/images/uvIndex.png)

### Five day forecast
  The array tomorrow uses the moment.js library to get the date for the next 5 days. Getting the information from the same time everyday helps the forecast information remain consistent throughout the days. The "if" statement inside of the "for" loop checks the weather api to get the information for the appropriate date and matching time for every date needed. 
  
![](https://github.com/Krieffer21/Krieffer_06HW_Weather/blob/master/images/fiveday.png)

### Current day
  The code seen below concatenates together the information for today's weather including city name, the current date, and the weather icon.
![](https://github.com/Krieffer21/Krieffer_06HW_Weather/blob/master/images/currentCity.png)

### Weather gif
Deployed Link:  https://krieffer21.github.io/Krieffer_WeatherApp/

  The gif shows that the city the user searches for is stored in local storage. When they search for a new city it is added to the list on the page and local storage. When a previous search is clicked on, that city's weather is displayed. 
![](https://github.com/Krieffer21/Krieffer_06HW_Weather/blob/master/images/weatherApp.gif)
