var divRow = $("<div class='row'>");
var divCol = $("<div class='col-12'>");
var inputCity = $("<input type='text' id='inputCity' placeholder='Enter city name'>");
var submitCity = $("<button id='submitCity'>Submit</button>");
var heading = $("<h1 style='text-align:center;'>Weather</h1>").css("text-algin","center");

$(".container").append(divRow);
$(divRow).append(divCol);
$(divCol).append(heading);
$(divCol).append(inputCity);
$(divCol).append("<br>");
$(divCol).append("<br>");
$(divCol).append(submitCity);

$("#submitCity").on("click", function(){
    $(".jumbotron").remove();
    // $(".jumbotron").empty();
    //current weather url
    var city = inputCity.val();
    var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=990173a80ddab7c6c6cba611c259c377";
    $.ajax({
        url: currentWeatherUrl,
        method: "GET"
        }).then(function(response) {
        // Create a new table row element
        //   var tRow = $("<tr>");
        console.log(response);
        var currentTemp = kelvinToCelsius(response.main.temp) + "\u00B0" +"F";
        var humidity = response.main.humidity +"%";
        var windSpeed = response.wind.speed+" MPH";
        var cityName = response.name;

        var jumbotron = $("<div>");
        var container = $("<div>");
        var cityHeading = $("<h1>");
        var weatherInfo = $("<p>");
        var date = new Date();

        jumbotron.addClass("jumbotron jumbotron-fluid");
        container.addClass("container");
        cityHeading.addClass("display-4");
        weatherInfo.addClass("lead");

        cityHeading.text(cityName);
        cityHeading.append("&nbsp;&nbsp;&nbsp;&nbsp;"+"("+ date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear()+")");
        weatherInfo.text("Temperature: " + currentTemp);
        weatherInfo.append("<br>");
        weatherInfo.append("Humidity: "+humidity);
        weatherInfo.append("<br>");
        weatherInfo.append("Wind Speed: "+windSpeed);
        weatherInfo.append("<br>");
        // weatherInfo.append("UV Index: fuck face");

        $(divCol).append(jumbotron);
        $(jumbotron).append(container);
        $(container).append(cityHeading);
        $(container).append(weatherInfo);


        // uv index api
        var lat = response.coord.lat;
        var long = response.coord.lon;
        var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + "&appid=990173a80ddab7c6c6cba611c259c377"

        $.ajax({
            url: uvUrl,
            method: "GET"
            }).then(function(response) {
                var uvIndex = response.value;
                console.log(response);
            // Create a new table row element
            //   var tRow = $("<tr>");
            // console.log(response);
            // $(divCol).append("UV Index: " + response.value);
            weatherInfo.append("UV Index: " + uvIndex);
            });


        var apiKey = "990173a80ddab7c6c6cba611c259c377";
        var fiveDayForecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=" + apiKey;

        $.ajax({
            url: fiveDayForecastUrl,
            method: "GET"
            }).then(function(response) {
                // var uvIndex = response.value;
                console.log(response);
                // weatherInfo.append("UV Index: "+uvIndex);
            });
        });
});







function kelvinToCelsius(kelvin) {
    var celsius =  kelvin - 273.15;
    return Math.round(celsius * 9 / 5 + 32);
}