function formatDate(timestamp) {
  //calculate the date
  let date = new Date(timestamp);
  let hours = timestamp.getHours();
  let minutes = date.getMinutes();
  let day = date.getDay();
return `${day} ${hours}:${minutes}`;
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
  degrees.innerHTML = `${temperature}°`;
  description.innerHTML = `${response.data.weather[0].description}`;
  descHumidity.innerHTML = `${response.data.main.humidity}`;
  descWind.innerHTML = `${roundWind}`;
  city.innerHTML = `${response.data.name}`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}
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
