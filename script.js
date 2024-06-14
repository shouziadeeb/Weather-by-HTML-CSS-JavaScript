console.log("check");

const input = document.querySelector(".searchBar input");
const searchButton = document.querySelector(".searchBar button");
const temp = document.querySelector(".temp");
const feel = document.querySelector(".feel");
const city = document.querySelector(".city");
const BackgrounVideo = document.querySelector(".Background_video");
const humidity = document.querySelector(".humidity");
const windspeed = document.querySelector(".wind");
const weather_icon = document.querySelector(".weather-icon");
const apikeycode = "9b382d893be25a57125186ae185c474f";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

window.onload = () => {
  checkWeather("amroha");
};

async function checkWeather(cityName) {
  const response = await fetch(apiUrl + cityName + `&appid=${apikeycode}  `);
  var data = await response.json();
  console.log(data);
  if (data.cod == 404) {
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".invalid_mssg").style.display = "block";
    BackgrounVideo.src = "";
    return;
  }
  city.innerHTML = data.name;
  feel.innerHTML = "feels like " + Math.round(data.main.feels_like) + "°c";
  temp.innerHTML = Math.round(data.main.temp) + "°c";
  humidity.innerHTML = data.main.humidity + "%";
  windspeed.innerHTML = data.wind.speed + " km/h";

  if (data.weather[0].main == "Clouds") {
    weather_icon.src = "Images/cloudsun.png";
    BackgrounVideo.src = "Videos/istockphoto-1355532687-640_adpp_is.mp4";
  }
  if (data.weather[0].main == "Haze") {
    weather_icon.src = "Images/clearcloud.png";
    BackgrounVideo.src = "Videos/hazevideo.mp4";
  }
  if (data.weather[0].main == "Rain") {
    weather_icon.src = "Images/rain.png";
    BackgrounVideo.src = "Videos/rainvideo.mp4";
  }
  if (data.weather[0].main == "Clear") {
    weather_icon.src = "Images/sun.png";
    BackgrounVideo.src = "Videos/clearWeather.mp4";
  }
  document.querySelector(".weather").style.display = "block";
  document.querySelector(".invalid_mssg").style.display = "none";
}
searchButton.addEventListener("click", () => {
  checkWeather(input.value);
});
