function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
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

function showTemp(response) {
  let city = document.querySelector("#name");
  let degrees = document.querySelector("#temperaturemain");
  let description = document.querySelector("#weatherdesc");
  let descHumidity = document.querySelector("#humidity");
  let descWind = document.querySelector("#wind");
  let temperature = Math.round(response.data.main.temp);
  let roundWind = Math.round(response.data.wind.speed)
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

celciusTemperature = `${temperature}`;

  degrees.innerHTML = `${temperature}`;
  description.innerHTML = `${response.data.weather[0].description}`;
  descHumidity.innerHTML = `${response.data.main.humidity}`;
  descWind.innerHTML = `${roundWind}`;
  city.innerHTML = `${response.data.name}`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

let celciusTemperature = null;

function handleSubmit(event) {
  event.preventDefault();
  let apiKey = "6e8ce867bc46f41d0e8f2b0e41afed08";
  let search = document.querySelector("#entercity");
  search = search.value.trim().toUpperCase();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
let changeCity = document.querySelector("form");
changeCity.addEventListener("submit", handleSubmit);

function showLocation(position) {
  let apiKey = "6e8ce867bc46f41d0e8f2b0e41afed08";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}
let locationButton = document.querySelector("#currentloc");
locationButton.addEventListener("click", getPosition);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celciusTemperature * 9 / 5) + 32;
  let temperature = document.querySelector("temperaturemain");
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}



let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);