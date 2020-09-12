$(document).ready(function() {

    // Global variables for holding date, local storage, and images
var date = moment().format("MM/DD/YYYY"); 
var cityList = JSON.parse(window.localStorage.getItem("cities")) || [];
var latestSearch = cityList[cityList.length - 1];
var weatherIcon = $("<img>").attr({src: "data:,"});
$("#weather-icon").append(weatherIcon);

    // This function makes the page display weather for the most recently searched city or hides the HTML if there is none. 
function pageSetup (){
    if (Array.isArray(cityList) && cityList.length ){
        updateCity(latestSearch);
    } else {
        $("#show-hide").hide();
        };
};
pageSetup();

    // Event handler for searching a city and adding it to local storage. It also tells the user if the search term is invalid. 
$("#search-btn").on("click", function(event){
    event.preventDefault();

    var cityName = $("#city-search").val().trim();           
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=1db4a4aa0a06e3711b3a075424bd2727";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        location.reload();       
        currentCity = response.name;
        currentDisplay(response);
        document.querySelector("#city-search").value = "";
   
        if (cityList.indexOf(currentCity) === -1){  
            cityList.push(cityName);  
            window.localStorage.setItem("cities", JSON.stringify(cityList));   
        };
    }).fail(function(){
        alert("City not found. Please try again.");
        document.querySelector("#city-search").value = "";
    });
});

    // Event handler to change the weather data display if the user clicks on a saved city. Saved cities are stored in divs under the search input.
$("#saved-searches").on("click", function(event){
    updateCity(event.target.innerHTML);
});

    // Event handler for the button to clear local storage and reload the page. 
$("#clear-btn").on("click", function(event){
    localStorage.clear();
    location.reload();  
});

    // This function checks local storage and populates the search history with individual divs for every saved city kept in local storage. 
function searchHistory (){
    for (i = 0; i < cityList.length; i++){   
        var savedCity = $("<li>");
        $(savedCity).addClass("list-group-item");
        $(savedCity).text(cityList[i]);
        $("#saved-searches").prepend(savedCity);
    };
};
searchHistory();

    // This function is used to update the displayed city weather dynamically whenever the user clicks on a saved city. 
function updateCity (city){
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=1db4a4aa0a06e3711b3a075424bd2727";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        currentDisplay(response);
        $(".current-weather").text(response.name +" (" + date +  ")");  
        var iconCode = response.weather[0].icon;                             
        var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
        var iconAlt = response.weather[0].description;
        $(weatherIcon).attr({src: iconUrl, alt: "Icon depicting " + iconAlt});
        document.querySelector("#city-search").value = "";
    });
};

// This function calls and displays weather data for the five-day forecast. 
function forecast (city){
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=1db4a4aa0a06e3711b3a075424bd2727";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(info){     
        function fiveDays (){
            
            for (i = 1; i < 6; i++) {
                var day = moment().add(i, "day").format("MM/DD/YYYY");
     
                var dayId = "#day-" + i + " h5";
                var tempId = "#day-" + i + " p:first";
                var humidId = "#day-" + i + " p.humid";
                var imgId = "#day-" + i + " img";
                var indexArr = [];

                for (var x = 1; x < 34; x += 8){ 
                    var forecastIndex = x;
                    indexArr.push(forecastIndex);
                };

                var newIndex = indexArr[i-1];
                var newIconIndex = newIndex += 4;

                var tempDay = info.list[newIndex].main.temp + " \u00B0F";
                var humidDay = "RH: " + info.list[newIndex].main.humidity + "%"; 

                var iconCode = info.list[newIconIndex].weather[0].icon;                                       
                var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
                var iconAlt = info.list[newIconIndex].weather[0].description;
                $(imgId).attr({src: iconUrl, alt: "Icon depicting " + iconAlt});
                
                $(dayId).text(day);
                $(tempId).text(tempDay);
                $(humidId).text(humidDay);
            };   
        };
        fiveDays();
    });
};

//  This function contains all the code for updating the weather data that is displayed in the app. 
// It also contains a callback to get the uv index, as that information is not included in the "Current Weather Data" call. 
function currentDisplay(response){
    $(".current-weather").text(response.name +" (" + date +  ")");       
    
    var iconCode = response.weather[0].icon;                                   
    var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
    var iconAlt = response.weather[0].description;

    var temperature = response.main.temp.toFixed();
    var humidity = response.main.humidity;
    var wind = response.wind.speed.toFixed(1);
    
    $("#temperature").text("Temperature: " + temperature + " \u00B0F");
    $("#humidity").text("Humidity: " + humidity + "%");
    $("#wind-speed").text("Wind Speed: " + wind + " MPH");
    
    forecast(response.name);
    
    var lat = response.coord.lat;
    var lon = response.coord.lon;

    var queryUvi = "http://api.openweathermap.org/data/2.5/uvi?appid=1db4a4aa0a06e3711b3a075424bd2727&lat=" + lat + "&lon=" + lon;

    $.ajax({
        url: queryUvi,
        method: "GET"
    }).then(function(data){
        var uvi = data.value;
        $("#uvi").text(uvi);  
        var uviBox = document.querySelector("#uvi");
        if (uvi < 3.3){
            uviBox.style.backgroundColor = "green";
        } else if (uvi > 3.3 && uvi < 6.6){
            uviBox.style.backgroundColor = "orange";
        } else {
            uviBox.style.backgroundColor = "red";
        };
    });
};
});