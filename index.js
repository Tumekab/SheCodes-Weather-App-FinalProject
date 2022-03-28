let apiKey = "60ace44fa1b88492bab7a31edc3708f3";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;
// `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;


function formatTime(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
		hours = `0${hours}`;
	}
    let minutes = date.getMinutes();
    if (minutes < 10) {
		minutes= `0${minutes}`;
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



function displayTemperature(response){

    let temperatureElement = document.querySelector("#current-temperature");
    let cityElement = document.querySelector("#searched-city");
    let descriptionElement = document.querySelector("#weather-type");
    // let humidityElement = document.querySelector("#humidity");
    // let windElement =  document.querySelector("#wind");
    let timeElement = document.querySelector("#current-time");
    let dayElement = document.querySelector("#current-day");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    // humidityElement.innerHTML = response.data.main.humidity;
    // windElement.innerHTML = Math.round(response.data.wind);
    timeElement.innerHTML = formatTime(response.data.dt * 1000);
    dayElement.innerHTML = formatDay(response.data.dt);

    
}   
axios.get(apiURL).then(displayTemperature);