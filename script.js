const key = '004cc253176c45a686b155843242202';

const btn = document.querySelector('.location');


async function getWeather() { 
    const response = await fetch("http://api.weatherapi.com/v1/forecast.json?key=004cc253176c45a686b155843242202&q=London&days=3&aqi=no&alerts=no");
    const weather = await response.json(); 
    console.log(weather);
    console.log(weather.location.country);
    return weather;
}

async function useWeatherData() { 
    const weatherData = await getWeather(); 
    console.log(weatherData.location.country); 
    console.log(weatherData.current.condition.text);
    console.log(weatherData.current.feelslike_c);
    console.log(weatherData.forecast.forecastday[1]);

}
useWeatherData();
