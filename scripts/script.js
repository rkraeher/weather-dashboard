$(document).ready(function() {

    // window.localStorage.clear();

var date = moment().format("MM/DD/YYYY");
var cityList = JSON.parse(window.localStorage.getItem("cities")) || []; // This is the local storage of saved searches. 
var currentCity; 
  
$("#searchBtn").on("click", function(event){
    event.preventDefault();

    var cityName = $("#citySearch").val().trim();   // This needs a condition so empty or unsuccessful searches aren't added and the user is alerted. 
    cityList.push(cityName);                        // Don't add repeated names.       

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=1db4a4aa0a06e3711b3a075424bd2727";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        currentCity = response.name;
        currentDisplay(response);
        document.querySelector("#citySearch").value = "";
   
        window.localStorage.setItem("cities", JSON.stringify(cityList)); 
        
        console.log(cityList);

        cityList.forEach(function (){
            var savedCity = $("<li>").addClass("list-group-item");
            $(".list-group").prepend(savedCity).text(cityName); 
            $(savedCity).append("<button>");
        
        });

    });
});



function currentDisplay(response){
    $(".current-weather").text(currentCity +" (" + date +  ")" +" #Icon"); //current city + current date + icon (which isn't text)
    var temperature = response.main.temp.toFixed();
    var humidity = response.main.humidity;
    var wind = response.wind.speed.toFixed(1);
    var uvi = // I will need to do another function to get the UV-index that passes the response city's coordinates as arguments to get the UVI: https://openweathermap.org/api/uvi //
                // The uvi also needs to be displayed inside a colored box whose css changes depending on UVI conditions (favorable, moderate, severe)
    $("#temperature").text("Temperature: " + temperature + " \u00B0F");
    $("#humidity").text("Humidity: " + humidity + "%");
    $("#wind-speed").text("Wind Speed: " + wind + " MPH");
    $("#uvi").text("UV Index: ");

    // searchHistory();
   
};

// function searchHistory (){

//     for (var i = 0; i < cityList.length; i++){
          
//         // var cityName = data
        



//         var getCity = localStorage.getItem(currentCity); 
//         var savedCity = $("<li>").addClass("list-group-item");
//         $(".list-group").prepend(savedCity).text(currentCity); 
             // I also need to add a button so it can have an event listener. 

        // var savedCity2 = $("<li>").addClass("list-group-item");
        // $(".list-group").prepend(savedCity2).text(getCity.name);



        //var history = jSON parse(localstorage of my key) || []
        // if history

        //It is all connected to one key

        // You are pushing new searches to the cityList array.  

        // if (history.indexOf(searchValue) === -1){   //NOt on the aray
        //     history.push(searchValue);
        //     localStorage.setitem (key, stringified array);

        // }

        // if (history.length > 0){
            // searchWeather(history[history.length-1])
        // }

//         // Looking at the quiz, I used the forEach method. 

//     } 
// };









// for(var i =0; i < localStorage.length; i++){
//     console.log(localStorage.getItem(localStorage.key(i)));
   
//   }

// init();

// function renderTodos() {
//     // Clear todoList element and update todoCountSpan
//     $(".list-group").innerHTML = "";
  
//     // Render a new li for each todo
//     for (var i = 0; i < cityList.length; i++) {
//       var city = cityList[i];
  
//       var li = document.createElement("li");
//       li.textContent = todo;
//       li.setAttribute("data-index", i);
  
//       var button = document.createElement("button");
//       button.textContent = "Complete";
  
//       li.appendChild(button);
//       todoList.appendChild(li);
//     }
//   }
  

// function init() {
//     // Get stored todos from localStorage
//     // Parsing the JSON string to an object
//     var storedTodos = JSON.parse(localStorage.getItem(currentCity));
  
//     // If todos were retrieved from localStorage, update the todos array to it
//     if (storedTodos !== null) {
//       cityList = storedTodos;
//     }
  
//     // Render todos to the DOM
//     renderTodos();
//   }
  









});