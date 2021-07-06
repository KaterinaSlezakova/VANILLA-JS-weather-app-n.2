function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

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
  
    return `${day} ${hours}:${minutes}`;
  
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function formatTime (timestamp) {
  let time = new Date (timestamp);
  let hours = time.getHours();
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;

}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
              <div class="weather-forecast-date">
                ${formatDay(forecastDay.dt)}
              </div>
      
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="50"
                />
              <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temp-max"> 
                 ${Math.round(forecastDay.temp.max)}°
                  </span>
                  <span class="weather-forecast-temp-min">
                  ${Math.round(forecastDay.temp.min)}°
                  </span>
              </div>
            </div>
          
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "476ec4516bf60be6018bdca6a47318a0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {

  let temperatureElement = document.querySelector("#temperature");

  celsiousTemp = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiousTemp);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let countryElement = document.querySelector("#country");
  countryElement.innerHTML = response.data.sys.country;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let sunriseElement = document.querySelector("#sunrise");
  sunriseElement.innerHTML = formatTime(response.data.sys.sunrise * 1000);

  let sunsetElement = document.querySelector("#sunset");
  sunsetElement.innerHTML = formatTime(response.data.sys.sunset * 1000);

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "476ec4516bf60be6018bdca6a47318a0";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
function showCurrentWeather(response) {
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = city;

  let country = document.querySelector("#country");
  country.innerHTML = response.data.sys.country;

  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = description;

  let currentTemp = Math.round(response.data.main.temp);
  let Temp = document.querySelector("#temperature");
  Temp.innerHTML = currentTemp;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed);
  
  let sunriseElement = document.querySelector("#sunrise");
  sunriseElement.innerHTML = formatTime(response.data.sys.sunrise * 1000);

  let sunsetElement = document.querySelector("#sunset");
  sunsetElement.innerHTML = formatTime(response.data.sys.sunset * 1000);


  getForecast(response.data.coord);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `476ec4516bf60be6018bdca6a47318a0`;
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCurrentWeather);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-position-button");
button.addEventListener("click", getCurrentPosition);
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Santorini");
