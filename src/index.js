let now = new Date();

let h2 = document.querySelector("h2");

let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];

let days = ["Sunday", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
let day = days[now.getDay()];

h2.innerHTML = `${day}, ${month} ${date} ${hour}:${minutes}`;

function showTemp(response) {
  let city = document.querySelector("#name");
  let degrees = document.querySelector("#temperaturemain");
  let description = document.querySelector("#weatherdesc");
  let deschumidity = document.querySelector("#humidity");
  let temperature = Math.round(response.data.main.temp);
  degrees.innerHTML = `${temperature}°`;
  description.innerHTML = `${response.data.weather[0].description}`;
  deschumidity.innerHTML = `${response.data.main.humidity}`;
  city.innerHTML = `${response.data.name}`;
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
