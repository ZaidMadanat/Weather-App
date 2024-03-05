const key = '004cc253176c45a686b155843242202';
let weather = null;
let isFahrenheit = false;
async function getWeather(country = "London") { 
    const countryName = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${country}&days=3&aqi=no&alerts=no`; 
    const response = await fetch(countryName);
    weather = await response.json(); 
    console.log(weather);
    console.log(weather.location.country);
    return weather;
}

function changeTemperature() {
    document.getElementById("ftoc").addEventListener("click", (e) => { 
        e.target.classList.toggle("celsius");
        isFahrenheit = !isFahrenheit;
        displayWeather(weather);
    })
}

function getCountry() { 
    document.querySelector('form').addEventListener("submit", async (e) => { 
        e.preventDefault();
        const country = document.querySelector('input[name="search"]').value;
        console.log(country);
        await getWeather(country);
        displayWeather(weather);
        document.querySelector('input[name="search"]').value = "";
    })
}



async function displayWeather(weatherData) { 
    let tempToday = ""; 
    let tempTomorrow = ""; 
    let tempAfterTomorrow = "";
    
    if ( !(isFahrenheit) ) { 
        tempToday = weatherData.current.temp_c;
        tempTomorrow = weatherData.forecast.forecastday[1].day.avgtemp_c;
        tempAfterTomorrow = weatherData.forecast.forecastday[2].day.avgtemp_c;
        console.log(weatherData.feelslike_c);
    }
    else {
        console.log(weatherData.feelsLike_f);
        tempToday = weatherData.current.temp_f;
        tempTomorrow = weatherData.forecast.forecastday[1].day.avgtemp_f;
        tempAfterTomorrow = weatherData.forecast.forecastday[2].day.avgtemp_f; 
    }
    
    //today
    console.log(weatherData.current.condition.text);
    console.log(weatherData.current.feelslike_c);
    console.log(weatherData.forecast.forecastday[1]);

    const todayIcon = weatherData.current.condition.icon;
    const todayText = weatherData.current.condition.text; 
    const todayHumidity = weatherData.current.humidity; 
    const currentDate = weatherData.forecast.forecastday[0].date;

    //tomorrow 
    const tomorrowIcon = weatherData.forecast.forecastday[1].day.condition.icon; 
    const tomorrowText = weatherData.forecast.forecastday[1].day.condition.text;
    const tomorrowHumidity = weatherData.forecast.forecastday[1].day.avghumidity; 
    const tomorrowDate = weatherData.forecast.forecastday[1].date;
    console.log(weatherData.forecast.forecastday[1].day.avghumidity);

    //day After Tomorrow 
    const dayAfterIcon = weatherData.forecast.forecastday[2].day.condition.icon;
    const dayAfterText = weatherData.forecast.forecastday[2].day.condition.text; 
    const dayAfterHumidity = weatherData.forecast.forecastday[2].day.avghumidity; 
    const dayAfterDate = weatherData.forecast.forecastday[2].date;

    // Adding to DOM 

    // Create the main container
    const mainContainer = document.createElement('div');
    mainContainer.id = 'mainWeatherContainer';
    
    // Define a base class for day containers
    const dayContainerBaseClass = 'dayWeatherContainer';

    // Today's weather container
    const todayContainer = document.createElement('div');
    todayContainer.className = `${dayContainerBaseClass} today`;
    todayContainer.innerHTML = `
        <h2>${weatherData.forecast.forecastday[0].date}</h2>
        <p>${weatherData.current.condition.text}</p>
        <img src="${'http:' + weatherData.current.condition.icon}" alt="Weather Icon" />
        <p>Temperature: ${isFahrenheit ? weatherData.current.temp_f + '°F' : weatherData.current.temp_c + '°C'}</p>
        <p>Humidity: ${weatherData.current.humidity}%</p>
    `;

    // Tomorrow's weather container
    const tomorrowContainer = document.createElement('div');
    tomorrowContainer.className = `${dayContainerBaseClass} tomorrow`;
    tomorrowContainer.innerHTML = `
        <h2>${weatherData.forecast.forecastday[1].date}</h2>
        <p>${weatherData.forecast.forecastday[1].day.condition.text}</p>
        <img src="${'http:' + weatherData.forecast.forecastday[1].day.condition.icon}" alt="Weather Icon" />
        <p>Temperature: ${isFahrenheit ? weatherData.forecast.forecastday[1].day.avgtemp_f + '°F' : weatherData.forecast.forecastday[1].day.avgtemp_c + '°C'}</p>
        <p>Humidity: ${weatherData.forecast.forecastday[1].day.avghumidity}%</p>
    `;

    // Day after tomorrow's weather container
    const dayAfterTomorrowContainer = document.createElement('div');
    dayAfterTomorrowContainer.className = `${dayContainerBaseClass} dayAfterTomorrow`;
    dayAfterTomorrowContainer.innerHTML = `
        <h2>${weatherData.forecast.forecastday[2].date}</h2>
        <p>${weatherData.forecast.forecastday[2].day.condition.text}</p>
        <img src="${'http:' + weatherData.forecast.forecastday[2].day.condition.icon}" alt="Weather Icon" />
        <p>Temperature: ${isFahrenheit ? weatherData.forecast.forecastday[2].day.avgtemp_f + '°F' : weatherData.forecast.forecastday[2].day.avgtemp_c + '°C'}</p>
        <p>Humidity: ${weatherData.forecast.forecastday[2].day.avghumidity}%</p>
    `;

    // Append each day's container to the main container
    mainContainer.appendChild(todayContainer);
    mainContainer.appendChild(tomorrowContainer);
    mainContainer.appendChild(dayAfterTomorrowContainer);
    
    // Append the main container to the body
    document.body.appendChild(mainContainer);

}

getCountry();
changeTemperature();