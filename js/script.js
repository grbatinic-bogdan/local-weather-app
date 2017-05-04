$(document).ready(function(){

  $.getJSON("http://ip-api.com/json")
    .then(function(dataip) {
        var lat     = dataip.lat,
            long    = dataip.lon;

        return $.getJSON(apiKey='http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=75f29a98d4c02d9b94eb7dfad062e9bc')
    })
    .then(function(data) {

        var weatherType = data.weather[0].description,
            tempK       = data.main.temp,
            windSpeed   = data.wind.speed,
            city        = data.name,
            tempF       = (tempK*(9/5)-459.67).toFixed(1);
            tempC       = (tempK - 273).toFixed(1);
            tempSwap    = true;

        $("#city").html(city);
        $("#weatherType").html(weatherType);
        $("#tempC").html("Temperature: " +tempC+ " &#8451; ");
        $("#windSpeed").html("Windspeed: " +windSpeed + " km/h");

        $("#switch").click(function(){

          if(tempSwap === false) {

            $("#tempC").html("Temperature: " +tempC+ " &#8451; ");
            tempSwap = true;
          } else {
            $("#tempC").html("Temperature: " +tempF + " &#8457; ");
            tempSwap = false;
          }
        });

       if(tempC == 0 && tempC < 0){
          $("#showicon").html('<i class="fa fa-thermometer-empty" aria-hidden="true"></i>');
        } else if (tempC > 0 && tempC < 15 ){
          $("#showicon").html('<i class="fa fa-thermometer-quarter" aria-hidden="true"></i>');
        } else if (tempC > 15 && tempC < 22 ){
          $("#showicon").html('<i class="fa fa-thermometer-half" aria-hidden="true"></i>');
        } else if (tempC > 22 && tempC < 32){
          $("#showicon").html('<i class="fa fa-thermometer-three-quarters" aria-hidden="true"></i>');
        } else {
          $("#showicon").html('<i class="fa fa-thermometer-full" aria-hidden="true"></i>');
        }
    });
});
