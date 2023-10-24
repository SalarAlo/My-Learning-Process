'use strict';

// inputs / buttons
const locationInp = document.querySelector('.location-inp');
const searchBtn = document.querySelector('.search-btn');

// labels
const locationLabel = document.querySelector('.location');
const temperatureLabel = document.querySelector('.temperature');
const humidityLabel = document.querySelector('.humidity');
const windSpeedLabel = document.querySelector('.wind-speed');

// image
const weatherIcon = document.querySelector('.weather-icon');

// containers
const containerHumiditiy = document.querySelector('.container-humidity');
const containerWindSpeed = document.querySelector('.container-wind-speed');

const onSearch = function(){
  const wait = seconds => new Promise(resolve => setTimeout(resolve, seconds * 1000));
  const removeHiddenClass = async function(){
    for(let i = 0; i < allElements.length; i++){
      await wait(0.5)
      allElements[i].classList.remove('hidden');
    }
  }

  const searchLocation = locationInp.value;
  const allElements = [
    weatherIcon,
    temperatureLabel,
    locationLabel, 
    containerHumiditiy,
    containerWindSpeed,
  ];

  allElements.forEach(elem => elem.classList.add('hidden'));

  const location = 
  fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${searchLocation}&language=en&format=json`)
    .then(response => response.json())
    .then(data => {
      const notValidCountry = !data?.results?.[0];

      if(notValidCountry)
        throw new Error('not a valid location/city');

      const lat = data.results[0].latitude;
      const lng = data.results[0].longitude;

      return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${'9d13534c3573705e85430c2e2a40e16d'}`);
    })
    .then(response =>  response.json())
    .then(data => {
      const setWeatherIcon = path => weatherIcon.src = path;
      const setTextContent = (elem, text) => elem.textContent = text;

      const temperature = Math.trunc(Math.trunc(data.main.temp) - 273.15) + '°C';
      const location = searchLocation[0].toUpperCase() + searchLocation.slice(1).toLowerCase();
      const windSpeed = (data.wind.speed * 3.6).toFixed(2) + 'km/h';
      const humidity = data.main.humidity + '%';
      const type = data.weather[0].main;

      setTextContent(locationLabel, location);
      setTextContent(temperatureLabel, temperature);
      setTextContent(windSpeedLabel, windSpeed);
      setTextContent(humidityLabel, humidity);
      
      switch(type){
        case 'Clouds':
          setWeatherIcon('img/cloudy_1163634.png');
          break;
        case 'Rain':
          setWeatherIcon('img/rain_6974819.png');
          break;
        case 'Clear':
          setWeatherIcon('img/sunny.png');
          break;
        case 'Drizzle':
          setWeatherIcon('img/rain_6974819.png');
          break;
        case 'Mist':
          setWeatherIcon('img/mist.png');
          break;
      };
      
      removeHiddenClass();
    })
    .catch(err => alert(err.message)
  );
};

searchBtn.addEventListener('click', onSearch);
locationInp.addEventListener('keypress', e => e.key == 'Enter' && onSearch());