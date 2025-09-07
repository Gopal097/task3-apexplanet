document.addEventListener('DOMContentLoaded', function () {
  const searchBtn = document.querySelector('.search-btn');
  const searchInput = document.querySelector('.search-input');
  const unitButtons = document.querySelectorAll('.unit-btn');
  const temperatureElement = document.querySelector('.temperature');
  const forecastTempElements = document.querySelectorAll('.forecast-temp');

  let currentUnit = 'celsius';
  let currentData = null;

  searchBtn.addEventListener('click', searchWeather);
  searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      searchWeather();
    }
  });

  unitButtons.forEach(button => {
    button.addEventListener('click', function () {
      unitButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      currentUnit = this.dataset.unit;
      updateTemperatureUnits();
    });
  });

  function searchWeather() {
    const city = searchInput.value.trim();
    if (city === '') {
      alert('Please enter a city name');
      return;
    }

    simulateAPICall(city);
  }

  function simulateAPICall(city) {
    const weatherData = {
      city: city,
      country: 'IN',
      temperature: {
        celsius: Math.floor(Math.random() * 35) + 5,
        fahrenheit: Math.floor(Math.random() * 63) + 41
      },
      description: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
      humidity: Math.floor(Math.random() * 50) + 30,
      windSpeed: (Math.random() * 15 + 1).toFixed(1),
      pressure: Math.floor(Math.random() * 30) + 1000,
      forecast: []
    };

    for (let i = 0; i < 5; i++) {
      weatherData.forecast.push({
        day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][i],
        icon: ['fa-sun', 'fa-cloud-sun', 'fa-cloud-rain', 'fa-cloud', 'fa-sun'][i],
        temperature: {
          celsius: Math.floor(Math.random() * 15) + 15 + i,
          fahrenheit: Math.floor(Math.random() * 27) + 59 + i
        }
      });
    }

    currentData = weatherData;
    updateWeatherDisplay();
  }

  function updateWeatherDisplay() {
    if (!currentData) return;

    document.querySelector('.location').textContent = `${currentData.city}, ${currentData.country}`;
    document.querySelector('.description').textContent = currentData.description;
    document.querySelector('.value:nth-child(2)').textContent = `${currentData.humidity}%`;
    document.querySelector('.value:nth-child(4)').textContent = `${currentData.windSpeed} km/h`;
    document.querySelector('.value:nth-child(6)').textContent = `${currentData.pressure} hPa`;

    updateTemperatureUnits();

    const forecastCards = document.querySelectorAll('.forecast-card');
    currentData.forecast.forEach((day, index) => {
      forecastCards[index].querySelector('.day').textContent = day.day;
      forecastCards[index].querySelector('.forecast-icon i').className = `fas ${day.icon}`;
    });

    updateForecastTemperatures();
  }

  function updateTemperatureUnits() {
    if (!currentData) return;

    if (currentUnit === 'celsius') {
      temperatureElement.textContent = `${currentData.temperature.celsius}°C`;
    } else {
      temperatureElement.textContent = `${currentData.temperature.fahrenheit}°F`;
    }

    updateForecastTemperatures();
  }

  function updateForecastTemperatures() {
    if (!currentData) return;

    forecastTempElements.forEach((element, index) => {
      if (currentUnit === 'celsius') {
        element.textContent = `${currentData.forecast[index].temperature.celsius}°C`;
      } else {
        element.textContent = `${currentData.forecast[index].temperature.fahrenheit}°F`;
      }
    });
  }

});
