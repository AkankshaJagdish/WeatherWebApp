// Select elements
const cityInput = document.getElementById('city');
const submitButton = document.getElementById('submit');
const weatherDiv = document.getElementById('weather');

// Add event listener to button
submitButton.addEventListener('click', function () {
    const cityName = cityInput.value; // Get the city name from the input

    // Fetch data from the API
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=XXXXXXXXX`)
    .then(response => response.json())
    .then(data => {
        // Log the data to the console
        console.log(data);

        // Clear the existing weather information
        weatherDiv.innerHTML = "";

        // Iterate over each day in the forecast
        data.list.forEach(day => {
            // Create a new weather-block for this day
            let weatherBlock = document.createElement('div');
            weatherBlock.className = 'weather-block';

            // Create a div for the timeline and weather data
            let timelineDiv = document.createElement('div');
            timelineDiv.className = 'timeline';
            let weatherDataDiv = document.createElement('div');
            weatherDataDiv.className = 'weather-data';

            // Append these divs to the weather-block
            weatherBlock.appendChild(timelineDiv);
            weatherBlock.appendChild(weatherDataDiv);

            // Add the weather-block to the weather div
            weatherDiv.appendChild(weatherBlock);

            let date = new Date(day.dt * 1000);
            let time = date.toLocaleTimeString(); // Get the time

            let weatherHTML = `
                <div class="weather-item">
                    <h3>${date.toDateString()} ${time}</h3> <!-- Display time -->
                    <p>Temperature: ${(day.main.temp - 273.15).toFixed(2)}°C</p>
                    <img src="http://openweathermap.org/img/w/${day.weather[0].icon}.png" alt="${day.weather[0].description}">
                </div>
            `;

            // Add a new timeline item for each forecast
            let timelineHTML = `
                <div class="timeline-item">
                    <div class="timeline-icon"></div>
                    <div class="timeline-time">${time}</div>
                </div>
            `;

            // Add the weather data and the timeline to the divs
            timelineDiv.innerHTML = timelineHTML; // Add the timeline HTML to the timeline div
            weatherDataDiv.innerHTML = weatherHTML; // Add the weather HTML to the weather-data div
        });
    })
    .catch(error => {
        // Log any errors to the console
        console.log(error);
    });
});
