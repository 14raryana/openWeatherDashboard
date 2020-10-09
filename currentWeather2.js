var divRow = $("<div class='row'>");
var divCol = $("<div class='col-12'>");
divCol.css("padding-left","0px");
divCol.css("padding-right","0px");
var inputCity = $("<input type='text' id='inputCity' placeholder='Enter city name'>");
var submitCity = $("<button id='submitCity'>Submit</button>");
var heading = $("<h1 style='text-align:center;'>Weather</h1>").css("text-algin","center");

var weatherIcon;
var weatherIconUrl;
var weatherIconDisplay = $("<img>");

$("#containEverything").append(divRow);
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
        var currentTemp = kelvinToCelsius(response.main.temp);
        var humidity = response.main.humidity +"%";
        var windSpeed = response.wind.speed+" MPH";
        var cityName = response.name;

        var jumbotron = $("<div>");
        var container = $("<div>");
        var cityHeading = $("<h1>");
        var weatherInfo = $("<p>");
        var date = new Date();
        var month = date.getMonth();
        var day = date.getDate();
        var year = date.getFullYear();

        weatherIcon = response.weather[0].icon;
        weatherIconUrl = "http://openweathermap.org/img/wn/"+weatherIcon+"@2x.png";
        // weatherIconDisplay = $("<img>");
        weatherIconDisplay.attr("src",weatherIconUrl);
        // weatherIconDisplay.css("background-color","white");


        


        jumbotron.addClass("jumbotron jumbotron-fluid");
        jumbotron.css("background-color","silver");
        // jumbotron.css("border","5px solid");
        container.addClass("container");
        cityHeading.addClass("display-4");
        weatherInfo.addClass("lead");

        cityHeading.text(cityName);
        cityHeading.append(" &nbsp;"+" ("+ month +"/"+day+"/"+year+")");
        cityHeading.append(weatherIconDisplay);
        


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

                // <div class="card" style="width: 18rem;">
                // <img class="card-img-top" src="..." alt="Card image cap">
                // <div class="card-body">
                // <h5 class="card-title">Card title</h5>
                // <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                // <a href="#" class="btn btn-primary">Go somewhere</a>
                // </div>
                // </div>
                var fiveDayForecastRow = $("<div>");
                fiveDayForecastRow.addClass("row");
                // fiveDayForecastRow.css("text-align","center");
                $("#containEverything").append("<h3>5-Day Forecast:</h3>");
                // fiveDayForecastRow.append("<br>");
                // fiveDayForecastRow.append("<br>");



                for(var i = 0; i < 5; i++) {
                    var divCard = $("<div>");
                    var divCardBody = $("<div>");
                    var newDay = date.getDate() + (i+1);
                    var newDate = new Date();
                    var futureTemp = kelvinToCelsius(response.daily[i+1].temp.day);
                    var futureHumidity = response.daily[i+1].humidity;

                    var futureWeatherIcon = response.daily[i+1].weather[0].icon;
                    var futureWeatherIconUrl = "http://openweathermap.org/img/wn/"+futureWeatherIcon+"@2x.png";
                    var futureWeatherIconDisplay = $("<img>");
                    futureWeatherIconDisplay.attr("src",futureWeatherIconUrl);


                    divCard.addClass("card");
                    // divCard.addClass("w-25");
                    divCard.css("width","20%");
                    divCardBody.addClass("card-body");

                    divCard.append(divCardBody);
                    fiveDayForecastRow.append(divCard);
                    $("#containEverything").append(fiveDayForecastRow);

                    newDate.setDate(newDay);
                    divCardBody.append(newDate.getMonth()+"/"+newDate.getDate()+"/"+newDate.getFullYear());
                    divCardBody.append("<br>");

                    divCardBody.append(futureWeatherIconDisplay);
                    divCardBody.append("<br>");

                    divCardBody.append("Temp: " + futureTemp);
                    divCardBody.append("<br>");
                    divCardBody.append("Humidity: " + futureHumidity +"%");



                }
            });
        });
});







function kelvinToCelsius(kelvin) {
    var celsius =  kelvin - 273.15;
    return Math.round(celsius * 9 / 5 + 32) + "\u00B0" + "F";
}