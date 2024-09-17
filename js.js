let cityName = document.querySelector(".weather-city");
let dateTime = document.querySelector(".weather-date-time");
let w_foreCast = document.querySelector(".weather-forecast");
let w_temperature = document.querySelector(".weather-temperature");
let w_icon = document.querySelector(".weather-icon");
let w_minTem = document.querySelector(".weather-min");
let w_maxTem = document.querySelector(".weather-max");

let w_feelsLike = document.querySelector(".weather-feelslike");
let w_humidity = document.querySelector(".weather-humidity");
let w_wind = document.querySelector(".weather-wind");
let W_pressure = document.querySelector(".weather-pressure");
let citysearch = document.querySelector(".weather-search");

const getCountryName = (code) => {
    return new Intl.DisplayNames([code], { type: "region" }).of(code);
};

const getDateTime = (dt) => {

    const curDate = new Date(dt * 1000);
    console.log(curDate);

    const option = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };

    const formatter = new Intl.DateTimeFormat("en-US", option);
    console.log(formatter);
    return formatter.format(curDate);
    
}

let city = "london";

citysearch.addEventListener("sumbit", (e) => {
    e.preventDefault();
    
    let cityName = document.querySelector(".city-name");
    console.log(cityName.Value);
    city = cityName.Value;

    getWeatherData();
    cityName.Value = "";

});


const getWeatherData = async () => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=a0b06669a793506ae54060f7df8a5fb6`;

    try {
        const res = await fetch(weatherUrl);
        const data = await res.json();
        console.log(data);

        const { main, name, weather, wind, sys, dt } = data;

        cityName.innerHTML = ` ${name}, ${getCountryName(sys.country)} `;
        dateTime.innerHTML = getDateTime(dt);

        w_foreCast.innerHTML = weather[0].main;
        w_icon.innerHTML = ` <img src= "http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;


        w_temperature.innerHTML = `${main.temp}&#176`;
        w_minTem.innerHTML = `Min: ${main.temp_min.toFixed()}&#176`;
        w_maxTem.innerHTML = `Max: ${main.temp_max.toFixed()}&#176`;

        w_feelsLike.innerHTML = `${main.feels_like.toFixed(2)}&#176`;
        w_humidity.innerHTML = `${main.humidity}%`;
        w_wind.innerHTML = `${wind.speed}m/s`;
        W_pressure.innerHTML = `${main.pressure} hpa`


    } catch (error) {
        console.log(error);

    }
};


document.body.addEventListener("load", getWeatherData());



