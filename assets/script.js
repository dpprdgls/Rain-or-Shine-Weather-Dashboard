
const apiKey = '165dd9ca68fdfa4ffbbf94d846a1293e';
const searchHistory = [];

// searchHistory.push("Palo Alto");
// searchWeather("Palo Alto");

async function searchWeather(cityName) {
    let cityNameInput = cityName; // Declare the variable here

    if (typeof cityNameInput === 'undefined') { // Check if cityName is undefined
        const cityInput = document.getElementById('cityInput');
        cityNameInput = cityInput.value.trim();
    }

    if (!cityNameInput) {
        alert('Please enter a city name.');
        return;
    }

    try {
        const { lat, lon } = await getLatLonForCity(cityNameInput);
        const weatherData = await fetchWeatherData(lat, lon);

        displayWeatherForecast(weatherData);
        addToSearchHistory(cityNameInput);
        cityInput.value = '';
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}




async function getLatLonForCity(cityName) {
    const geoData = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`);
    const geoDataJson = await geoData.json();

    if (geoDataJson && geoDataJson.length > 0) {
        const { lat, lon } = geoDataJson[0];
        return { lat, lon };
    } else {
        throw new Error('City not found');
    }
}
//&units=imperial
async function fetchWeatherData(lat, lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`);
    return await response.json();
    console.log(response.json());
}

function addToSearchHistory(cityName) {
    searchHistory.push(cityName);
    updateSearchHistory();
}

function updateSearchHistory() {
    const searchHistoryList = document.getElementById('searchHistory');
    searchHistoryList.innerHTML = '';

    for (const city of searchHistory) {
        const listItem = document.createElement('li');
        listItem.textContent = city;
        //change to add search history function to display weather for previous city
        listItem.addEventListener('click', function() {
            //loads the forecast for the clicked city
            const cityName = listItem.textContent;
            searchWeather(cityName);
        });
        searchHistoryList.appendChild(listItem);
    }
}

       

        function displayWeatherForecast(data) {
            const currentDayContainer = document.getElementById('currentDay');
            const forecastDiv = document.getElementById('weather-forecast');
            forecastDiv.innerHTML = '';
        
            // Use the current date for the first day's forecast
            const currentDayForecast = data.list[0];
            const currentDate = new Date(currentDayForecast.dt * 1000);
        
            // Extract data for the first day
            const temperatureCurrent = currentDayForecast.main.temp;
            const windSpeed = currentDayForecast.wind.speed;
            const humidity = currentDayForecast.main.humidity;
            const weatherIcon = currentDayForecast.weather[0].icon;
        
            const currentDayContent = `
                <h2>${currentDate.toDateString()}</h2>
                <p>Temperature: ${temperatureCurrent}°F</p>
                <p>Wind Speed: ${windSpeed} mph</p>
                <p>Humidity: ${humidity}%</p>
                <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon">`;
            currentDayContainer.innerHTML = currentDayContent;
        
            for (let i = 1; i <= 5; i++) {
                const forecast = data.list[i * 8 - 5];
                if (forecast){
                // Calculate the date for each day
                // const forecastDate = new Date(forecast.dt * 1000);
                const currentDate = new Date(data.list[0].dt * 1000); // Use the current date from the first forecast
                const forecastDate = new Date(currentDate);
                forecastDate.setDate(currentDate.getDate() + i);
                console.log(forecast);
                
                const temperature = forecast.main.temp;
                const windSpeed = forecast.wind.speed;
                const humidity = forecast.main.humidity;
                const weatherIcon = forecast.weather[0].icon;
            
                const forecastItem = document.createElement('div');
                forecastItem.classList.add('forecast-item');
                forecastItem.innerHTML = `
                    <h2>${forecastDate.toDateString()}</h2>
                    <p>Temperature: ${temperature}°F</p>
                    <p>Wind Speed: ${windSpeed} mph</p>
                    <p>Humidity: ${humidity}%</p>
                    <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon">
                `;
            
                forecastDiv.appendChild(forecastItem);
            }
        }
    }

        // Initial display of search history
        updateSearchHistory();