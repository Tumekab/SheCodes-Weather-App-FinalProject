

function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return day;
}

function displayForecast(response) {
    let forecast = response.data.daily;
    let weather = response.data.current.weather[0].description;
    
  
    let forecastElement = document.querySelector("#forecast");
    // let weatherElement = document.querySelector("#current-weather");
  
    let forecastHTML = `<div class="row week-forecast">`;
    forecast.forEach(function (forecastDay, index) {
      if (index < 6) {
        forecastHTML =
          forecastHTML +
          `
        <div class="col">
          <h3>${formatDay(forecastDay.dt)}</h3>
          <img
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt=""
            width="42"
          />
          <p class="weather">${weather}</p>
          <div class="weather-forecast-temperatures">
            <span> ${Math.round(
              forecastDay.temp.day
            )}° </span>
          </div>
        </div>
    `;
      }
    });
  
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  }

function getForecast(coordinates) {
    let apiKey = "60ace44fa1b88492bab7a31edc3708f3";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#searched-city");
  let descriptionElement = document.querySelector("#weather-type");
  let humidityElement = document.querySelector("#humidity");
  let windElement =  document.querySelector("#wind");
  let timeElement = document.querySelector("#current-time");
  let dayElement = document.querySelector("#current-day");
  
  celsiusTemperature = response.data.main.temp;


  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  timeElement.innerHTML = formatTime(response.data.dt * 1000);
  dayElement.innerHTML = formatDay(response.data.dt);

  getForecast(response.data.coord);

}


function searchCity(city) {
  let apiKey = "60ace44fa1b88492bab7a31edc3708f3";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    searchCity(searchInputElement.value);
}

function displayFahrenheitTemp(event) {
    event.preventDefault();
    let fahrenheitTemp = (celsiusTemperature * 9 / 5 + 32);
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let temperatureElement = document.querySelector("#current-temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsiusTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#current-temperature");
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

searchCity("London");
displayForecast();