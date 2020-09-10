$(document).ready(function() {

    // window.localStorage.clear();
    
    // forecast("Boston");     //** Just for testing purposes */

var date = moment().format("MM/DD/YYYY"); 
var cityList = JSON.parse(window.localStorage.getItem("cities")) || [];
  
$("#searchBtn").on("click", function(event){
    event.preventDefault();

    var cityName = $("#city-search").val().trim(); // Alert if invalid input   
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=1db4a4aa0a06e3711b3a075424bd2727";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        currentCity = response.name;
        currentDisplay(response);
        document.querySelector("#city-search").value = "";
   
        if (cityList.indexOf(currentCity) === -1){   // Right now this makes it so that nothing redundant is added to local storage, but if it is already in local storage it won't create the li either. 
            cityList.push(cityName);  
            window.localStorage.setItem("cities", JSON.stringify(cityList));     
        };

        
        // cityList.forEach(function (){                    //** Tried moving this outside below and make it a separate function. 
        //     var savedCity = $("<li>");
        //     $(savedCity).addClass("list-group-item");
        //     $(savedCity).text(cityName);
        //     $("#saved-searches").prepend(savedCity)
        //     var savedCityBtn = $("<button>");
        //     savedCityBtn.style.display = "none";        //!! Comment this out and it breaks. 
        //     $(savedCity).append(savedCityBtn);
        // });

    });

});

$("#saved-searches").on("click", function(event){
    updateCity(event.target.innerHTML);
    // Add some css to make the li-element light up a certain color indicating that they clicked it
});

function searchHistory (){
    for (i = 0; i < cityList.length; i++){
        console.log(cityList);
        
        var savedCity = $("<li>");
        $(savedCity).addClass("list-group-item");
        $(savedCity).text(cityList);
        $("#saved-searches").prepend(savedCity)
        var savedCityBtn = $("<button>");
        savedCityBtn.style.display = "none";        //!! Comment this out and it breaks. 
        $(savedCity).append(savedCityBtn);
    
    };
};
searchHistory();

function updateCity (city){
    event.preventDefault();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=1db4a4aa0a06e3711b3a075424bd2727";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        currentDisplay(response);
        $(".current-weather").text(response.name +" (" + date +  ")" +" #Icon");
        document.querySelector("#city-search").value = "";
    });
};

function forecast (city){
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=1db4a4aa0a06e3711b3a075424bd2727";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(info){
        console.log(info);
        console.log(info.list[0].main.temp);
        console.log(info.list[8].main.temp);
        console.log(info.list[16].main.temp);
        console.log(info.list[24].main.temp);
        console.log(info.list[39].main.temp);
    });
};

function currentDisplay(response){
    $(".current-weather").text(currentCity +" (" + date +  ")" +" #Icon");
    var temperature = response.main.temp.toFixed();
    var humidity = response.main.humidity;
    var wind = response.wind.speed.toFixed(1);
    
    $("#temperature").text("Temperature: " + temperature + " \u00B0F");
    $("#humidity").text("Humidity: " + humidity + "%");
    $("#wind-speed").text("Wind Speed: " + wind + " MPH");
    
    
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