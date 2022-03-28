let apiKey = "60ace44fa1b88492bab7a31edc3708f3";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;
// `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

function displayTemperature(response){

    let temperatureElement = document.querySelector("#current-temperature");
    let cityElement = document.querySelector("#searched-city");
    let descriptionElement = document.querySelector("#weather-type");
    // let humidityElement = document.querySelector("#humidity");
    // let windElement =  document.querySelector("#wind");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    // humidityElement.innerHTML = response.data.main.humidity;
    // windElement.innerHTML = Math.round(response.data.wind);
    
}   
axios.get(apiURL).then(displayTemperature);