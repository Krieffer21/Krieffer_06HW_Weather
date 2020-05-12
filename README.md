# Krieffer_06HW_Weather

## Weather Api
  This assigment was to create a weather application the gave the current days weather along with a 5 day forecast. The user is able to search for a city and see the weather results, and click on prior searches. The cities the user searches for needed to be saved to local storage. I used the openweather api, and moment.js, a time/ date library, to call on to get the required informaiton needed. 

### UV Index
  In order to get the UV index for the current weather you need the longitude and latitude of the city when calling on the UV index api. (Shown in first screenshot) When getting the UV index we also need to color code it depending on the severity. By Making the result of the UV index into an integer it can then be checked in the following if statments to attribute the propper class to give the desired css styling for the color. 
  
![](https://github.com/Krieffer21/Krieffer_06HW_Weather/blob/master/images/UvIndex1.png)
![](https://github.com/Krieffer21/Krieffer_06HW_Weather/blob/master/images/uvIndex.png)

### Five day forecast
  The array tomorrow uses the moment.js library to get the date, and the requested days after along with the same time every day. Getting the information from the same time everyday helps the forecast information remain consistent throughout the days. The if stament inside of the for loop checks the weather api to get the information for thr prooper date and matching time for every date needed. Once the correct date and time for that day is found then get the weather information. 
  
![](https://github.com/Krieffer21/Krieffer_06HW_Weather/blob/master/images/fiveday.png)

### Current day
  The first line of the current weather concatinates together the city name, the current date, and the weather icon.
![](https://github.com/Krieffer21/Krieffer_06HW_Weather/blob/master/images/currentCity.png)

### Weather gif
  The gif shows that the city the user searches for is stored in local storage. When they search for a new city it is added to the list on the page and local storage. When a previous search is clicked on, that city's weather is displayed. 
![](https://github.com/Krieffer21/Krieffer_06HW_Weather/blob/master/images/weatherApp.gif)
