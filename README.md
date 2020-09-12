# weather-dashboard

#Description
A web app to display weather information for a searched city. The app saves previous searches in local storage. 
This browser app displays weather information for a city indicated by search input from the user. Invalid city 
searches alert the user to try again. When the user searches for a valid city, the app saves the city in a clickable
div below the search input so that they may look at a previously searched city for convenience or planning purposes. 

#Functionality
In the app, the currently searched city
name appears with the current date as well as the following data: current temperature in degrees Fahrenheit, 
relative humidity as a percentage, wind speed in miles per hour, and the UV Index. The UVI is presented in a colored
box that corresponds to the conditions of that given index. Safe/low uvi is presented in green, moderate conditions
are displayed in orange, and severe UVI conditions are displayed with a red box. The current city also shows an 
icon that gives current weather conditions for the day (cloudy, sunny, etc.).

The app also displays the five-day forecast for that city below the current day's weather. The forecast data displays:
the date, an icon representing weather conditions, the temperature, and the relative humidity (abbreviated as RH).

#Technologies
The app is built from HTML and CSS using the Bootstrap framework. It is powered by JavaScript and jQuery and gathers
weather data from the OpenWeather API. 

#Deployed App:

![Screenshot of deployed app]

#Created by
Rudi Kraeher
September 2020


