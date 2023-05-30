function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let AmOrPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

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
  return `${day} ${hours}:${minutes} ${AmOrPm}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#Wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "66d6ff1238907f6dafb724d6e10a9b10";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");

function revealImperialWindRate(event) {
  event.preventDefault();
  let windElementRate = document.querySelector("#wind");

  metricWindUnitLink.classList.remove("active");
  imperialWindUnitLink.classList.add("active");

  metricWindRate = Math.round(response.data.wind.speed * 3.6) * 1;
  let imperialWindRate = Math.round(metricWindRate / 1.609344);
  windElementRate.innerHTML = Math.round(imperialWindRate);
}

function revealMetricWindRate(event) {
  event.preventDefault();

  metricWindUnitLink.classList.add("active");
  imperialWindUnitLink.classList.remove("active");

  let windElementRate = document.querySelector("#wind");

  metricWindRate = Math.round(response.data.wind.speed * 3.6) * 1;

  windElementRate.innerHTML = Math.round(metricWindRate);
}

let metricWindUnitLink = document.querySelector("#metric-wind-unit-link");
metricWindUnitLink.addEventListener("click", revealMetricWindRate);

let imperialWindUnitLink = document.querySelector("#imperial-wind-unit-link");
imperialWindUnitLink.addEventListener("click", revealImperialWindRate);

// Function to convert kmph to mph
function kmphTOmph(kmph) {
  return 0.6214 * kmph;
}

// Function to convert mph to kmph
function mphTOkmph(mph) {
  return 1.60934 * mph;
}
