"use strict";
$(document).ready(function() {
    var e = JSON.parse(localStorage.weather);
    setWeather(e, !1), "" == $setting.get("wcity") ? autoWeather() : getCityByCity(), setWeatherWeek()
});