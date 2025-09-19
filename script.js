const unsplashApiKey = 'hsnsQ6074YcWYEf237Z3amMtVzu-028V9dAQmhj9QWs'; 
const openWeatherApiKey = '4bce4afec60fd3205caa6d3f4cdeecbb';

const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const photoGallery = document.getElementById('photo-gallery');
const weatherDisplay = document.getElementById('weather-display');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getPhotos(city);
        getWeather(city);
    }
});

async function getPhotos(city) {
    photoGallery.innerHTML = '<p>Loading photos...</p>';
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=${unsplashApiKey}`);
        if (!response.ok) {
            throw new Error('Could not get photos from Unsplash. Please check your API key.');
        }
        const data = await response.json();
        displayPhotos(data.results);
    } catch (error) {
        photoGallery.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

function displayPhotos(photos) {
    if (photos.length === 0) {
        photoGallery.innerHTML = '<p>No photos found for this city.</p>';
        return;
    }
    photoGallery.innerHTML = ''; // Clear previous photos
    photos.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo.urls.small;
        img.alt = photo.alt_description || 'A photo of ' + cityInput.value;
        photoGallery.appendChild(img);
    });
}

async function getWeather(city) {
    weatherDisplay.innerHTML = '<p>Loading weather data...</p>';
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('Could not get weather data from OpenWeatherMap. Please check your API key or city name.');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherDisplay.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

function displayWeather(data) {
    const { name, main, weather } = data;
    weatherDisplay.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${Math.round(main.temp)}°C</p>
        <p>Condition: ${weather[0].description}</p>
        <p>Humidity: ${main.humidity}%</p>
    `;
}