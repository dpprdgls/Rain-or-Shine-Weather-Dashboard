// const geoKey = '11044aa845b946827ff51d5433745a93';
const apiKey = '165dd9ca68fdfa4ffbbf94d846a1293e';
        const searchHistory = [];

        async function searchWeather() {
            const cityInput = document.getElementById('cityInput');
            const cityName = cityInput.value.trim();

            if (cityName === '') {
                alert('Please enter a city name.');
                return;
            }
  
// working function for 5 day forecast 
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&cnt=40&appid=${apiKey}`);
                const data = await response.json();
                displayWeatherForecast(data);
                addToSearchHistory(cityName);
                cityInput.value = '';
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
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
                searchHistoryList.appendChild(listItem);
            }
        }

        // function displayWeatherForecast(data) {
        //     const currentDayContainer = document.getElementById('currentDay');
        //     const forecastDiv = document.getElementById('weather-forecast');
        //     forecastDiv.innerHTML = '';
            
        //     let currentDate = new Date();

        //     const currentDayForecast = data.list[0];
        //     const currentDayContent = `
        //     <h2>${forecastDate.toDateString()}</h2>
        //     <p>Temperature: ${temperature}°F</p>
        //     <p>Wind Speed: ${windSpeed} mph</p>
        //     <p>Humidity: ${humidity}%</p>
        //     <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon">`;
        //     currentDayContainer.innerHTML = currentDayContent;



        //     for (let i = 1; i < 6; i++) {
        //         const forecast = data.list[i];
        //         // console.log(forecast);
        //         const temperature = forecast.main.temp;
        //         const windSpeed = forecast.wind.speed;
        //         const humidity = forecast.main.humidity;
        //         const weatherIcon = forecast.weather[0].icon;

               

        //         const forecastItem = document.createElement('div');
        //         forecastItem.classList.add('forecast-item');
        //         forecastItem.innerHTML = `
        //             <h2>${forecastDate.toDateString()}</h2>
        //             <p>Temperature: ${temperature}°F</p>
        //             <p>Wind Speed: ${windSpeed} mph</p>
        //             <p>Humidity: ${humidity}%</p>
        //             <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon">
        //         `;

        //         forecastDiv.appendChild(forecastItem);
        //     }
        // }

        function displayWeatherForecast(data) {
            const currentDayContainer = document.getElementById('currentDay');
            const forecastDiv = document.getElementById('weather-forecast');
            forecastDiv.innerHTML = '';
        
            // Use the current date for the first day's forecast
            const currentDayForecast = data.list[0];
            const currentDate = new Date(currentDayForecast.dt * 1000);
        
            // Extract data for the first day
            const temperature = currentDayForecast.main.temp;
            const windSpeed = currentDayForecast.wind.speed;
            const humidity = currentDayForecast.main.humidity;
            const weatherIcon = currentDayForecast.weather[0].icon;
        
            const currentDayContent = `
                <h2>${currentDate.toDateString()}</h2>
                <p>Temperature: ${temperature}°F</p>
                <p>Wind Speed: ${windSpeed} mph</p>
                <p>Humidity: ${humidity}%</p>
                <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon">`;
            currentDayContainer.innerHTML = currentDayContent;
        
            for (let i = 1; i <= 5; i++) {
                const forecast = data.list[i];
                // Calculate the date for each day based on the current date
                const forecastDate = new Date(currentDate);
                forecastDate.setDate(currentDate.getDate() + i);
        
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

        // Initial display of search history
        updateSearchHistory();