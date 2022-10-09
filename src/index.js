let temperature = 0;
let humidity = 0;
//let celsiusTemperature = Math.round(temperature);
//let fahrenheitTemperature = Math.round((temperature * 9) / 5 + 32);

//let currentTime = document.querySelector("#current-time");
let now = new Date();
let h2 = document.querySelector("h5");
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];
h2.innerHTML = `${day} ${month} ${date}, ${hours}:${minutes},${year}`;

function changeTempFah() {
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = `<h1 id="temp">78</h1>`;
}
let fahTemp = document.querySelector("#fahrenheit-link");
fahTemp.addEventListener("click", changeTempFah);
function changeTempCel() {
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = `<h1 id="temp">24</h1>`;
}
let celTemp = document.querySelector("#celsius-link");
celTemp.addEventListener("click", changeTempCel);

let current = document.querySelector(".current");
current.addEventListener("click", getCurrentPosition);

let search = document.querySelector(".search");
search.addEventListener("click", getCity);

function getCity() {
  let city = document.getElementById("input-city").value;
  let units = "metric";
  let apiKey = "8f1cd08b0088cf5293ea4212199b7d57";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(changeDetails);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(getCoordinates);
}

function getCoordinates(response) {
  let lat = response.coords.latitude;
  let long = response.coords.longitude;
  let units = "metric";
  let apiKey = "8f1cd08b0088cf5293ea4212199b7d57";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(changeDetails);
}

let InputLocation;
let windSpeed;
let weather;

function showDetails() {
  let city = document.querySelector(".city");
  city.innerHTML = InputLocation;
  let currentTemp = document.querySelector(".temp_today");
  currentTemp.innerHTML = `${temperature}°`;
  let currentHumidity = document.querySelector(".humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;
  let currentWind = document.querySelector(".wind");
  currentWind.innerHTML = `Wind: ${windSpeed}km/h`;
  let currentWeather = document.querySelector(".weather");
  currentWeather.innerHTML = weather;
}

function changeDetails(response) {
  temperature = Math.round(response.data.main.temp);
  humidity = Math.round(response.data.main.humidity);
  windSpeed = Math.round(response.data.wind.speed);
  console.log(response);
  weather = response.data.weather[0].description;
  InputLocation = response.data.name;
  showDetails();
}

function showCheckedCityTemp(event) {
  event.preventDefault();

  let input = document.querySelector("#input-city");
  getCity(input.value);
}

let form = document.querySelector("#formId");
form.addEventListener("submit", showCheckedCityTemp);
