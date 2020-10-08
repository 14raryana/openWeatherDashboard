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

// var dateTime = new Date();
// var time = dateTime.getHours() + ":" + dateTime.getMinutes();
// var date = dateTime.getMonth() + "/" + dateTime.getDate() + "/" + dateTime.getFullYear();

// alert(date);

var dateTime = new Date();
// var timeHour = dateTime.getHours();
// if(timeHour == 16) {
//     alert("hours are the same")
// }
// else {alert("hours not the same")}
var date = dateTime.getFullYear() + "-" + dateTime.getMonth() + "-" + dateTime.getDate() + " " + dateTime.getHours() + ":" + dateTime.getMinutes() + ":" + dateTime.getSeconds();
alert(date);

$("#submitCity").on("click",function(){

    var city = inputCity.val();
    var apiKey = "990173a80ddab7c6c6cba611c259c377";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

        // 5 day forecast api
        
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
        // Create a new table row element
        //   var tRow = $("<tr>");
        // console.log(response);
        
        // for(var i = 0; i < response.list.length; i++) {
        //     var time = response.list
        // }
        // console.log(response.list[0].dt_txt.length);

        var temp = response.list[0].main.temp;
        // console.log(kelvinToCelsius(temp));

// <div class="jumbotron jumbotron-fluid">
//   <div class="container">
//     <h1 class="display-4">Fluid jumbotron</h1>
//     <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
//   </div>
// </div>
        var cityName = response.city.name;
        

        var jumbotron = $("<div>");
        var container = $("<div>");
        var cityHeading = $("<h1>");
        var weatherInfo = $("<p>");

        jumbotron.addClass("jumbotron jumbotron-fluid");
        container.addClass("container");
        cityHeading.addClass("display-4");
        weatherInfo.addClass("lead");

        cityHeading.text(cityName);

        $(divCol).append(jumbotron);
        $(jumbotron).append(container);
        $(container).append(cityHeading);
        $(container).append(weatherInfo);


        $(divCol).append("<h4>5-Day Forecast: </h4>");
        


        var lat = response.city.coord.lat;
        var long = response.city.coord.lon;

        // Methods run on jQuery selectors return the selector they we run on
        // This is why we can create and save a reference to a td in the same statement we update its text
        //   var titleTd = $("<td>").text(response.Title);
        //   var yearTd = $("<td>").text(response.Year);
        //   var actorsTd = $("<td>").text(response.Actors);
            
        // Append the newly created table data to the table row
        //   tRow.append(titleTd, yearTd, actorsTd);
        // Append the table row to the table body
        //   $("tbody").append(tRow);


        // uv index api
        var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + "&appid=990173a80ddab7c6c6cba611c259c377"

        $.ajax({
            url: uvUrl,
            method: "GET"
            }).then(function(response) {
            // Create a new table row element
            //   var tRow = $("<tr>");
            // console.log(response);
            $(divCol).append("UV Index: " + response.value);
            });

        });



       
});



function kelvinToCelsius(kelvin) {
    var celsius =  kelvin - 273.15;
    return Math.round(celsius * 9 / 5 + 32);
}

// function celsiusToFahrenheit(celsius) {
//     celsius * 9 / 5 + 32;
// }
