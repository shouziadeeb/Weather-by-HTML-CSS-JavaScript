const input = document.querySelector(".searchBar input");
const searchButton = document.querySelector(".searchBar button");
const temp = document.querySelector(".temp");
const feel = document.querySelector(".feel");
const city = document.querySelector(".city");
const BackgrounVideo = document.querySelector(".Background_video");
const humidity = document.querySelector(".humidity");
const windspeed = document.querySelector(".wind");
const weather_icon = document.querySelector(".weather-icon");
const suggestionsBox = document.getElementById("suggestionsBox");
const toggleBtn = document.getElementById("toggleBtn");

const apikeycode = "9b382d893be25a57125186ae185c474f";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

let data;

let isCelsius = true;
toggleBtn.textContent = "°F";

toggleBtn.addEventListener("click", function () {
  let temp_In_C = data?.main?.temp;
  isCelsius = !isCelsius;
  toggleBtn.textContent = isCelsius ? "°F" : "°C";
  toggleBtn.classList.toggle("active", isCelsius);
  temp.innerHTML = isCelsius
    ? Math.round(temp_In_C) + "°C"
    : (Math.round(temp_In_C) * 9) / 5 + 32 + "°F";
});
window.onload = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        getCityName(latitude, longitude);
      },
      (error) => {
        console.error("Error getting location:", error.message);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  } else {
    console.log("Geolocation is not supported.");
    checkWeather("amroha");
  }
};
let currentCityName;
function getCityName(lat, lon) {
  fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Reverse Geocoding Data:", data);
      const city =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.state ||
        "Unknown";
      console.log("Detected City:", city);
      checkWeather(city);
      currentCityName = city;
    })
    .catch((error) => {
      console.error("Error getting city name:", error);
    });
}

const indianStatesAndUTs = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
  "Jammu and Kashmir",
  "Ladakh",
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Ahmedabad",
  "Chennai",
  "Kolkata",
  "Surat",
  "Pune",
  "Jaipur",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Thane",
  "Bhopal",
  "Visakhapatnam",
  "Patna",
  "Vadodara",
  "Ghaziabad",
  "Ludhiana",
  "Agra",
  "Nashik",
  "Faridabad",
  "Meerut",
  "Rajkot",
  "Kalyan-Dombivli",
  "Vasai-Virar",
  "Varanasi",
  "Srinagar",
  "Aurangabad",
  "Dhanbad",
  "Amritsar",
  "Navi Mumbai",
  "Allahabad",
  "Howrah",
  "Gwalior",
  "Jabalpur",
  "Coimbatore",
  "Vijayawada",
  "Jodhpur",
  "Madurai",
  "Raipur",
  "Kota",
  "Chandigarh",
  "Guwahati",
  "Solapur",
  "Hubli–Dharwad",
  "Bareilly",
  "Moradabad",
  "Mysore",
  "Tiruchirappalli",
  "Tiruppur",
  "Gurgaon",
  "Aligarh",
  "Jalandhar",
  "Bhubaneswar",
  "Salem",
  "Warangal",
  "Mira-Bhayandar",
  "Thiruvananthapuram",
  "Bhiwandi",
  "Saharanpur",
  "Guntur",
  "Amravati",
  "Bikaner",
  "Noida",
  "Jamshedpur",
  "Bhilai",
  "Cuttack",
  "Firozabad",
  "Kochi",
  "Nellore",
  "Bhavnagar",
  "Dehradun",
  "Durgapur",
  "Asansol",
  "Rourkela",
  "Nanded",
  "Kolhapur",
];
let con = false;

async function checkWeather(cityName) {
  const curCity = cityName ? cityName : currentCityName;
  console.log(curCity);

  axios
    .get(`${apiUrl}${curCity}&appid=${apikeycode}`)
    .then((response) => {
      data = response.data;
      console.log(data);
      if (data.cod == 404) {
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".invalid_mssg").style.display = "block";
        BackgrounVideo.src = "";
        return;
      }
      city.innerHTML = data.name;
      feel.innerHTML = "Feels like " + Math.round(data.main.feels_like) + "°c";
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
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      document.querySelector(".weather").style.display = "none";
      document.querySelector(".invalid_mssg").style.display = "block";
      BackgrounVideo.src = "";
      return;
    });
}
searchButton.addEventListener("click", (e) => {
  checkWeather(input.value);
});
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkWeather(input.value);
  }
});
input.addEventListener("input", function (e) {
  const query = this.value.toLowerCase();
  suggestionsBox.innerHTML = "";

  if (query.length === 0) {
    suggestionsBox.style.display = "none";
    return;
  }

  const filteredSuggestions = indianStatesAndUTs.filter((item) =>
    item.toLowerCase().includes(query)
  );

  if (filteredSuggestions.length === 0) {
    suggestionsBox.style.display = "none";
    return;
  }

  filteredSuggestions.forEach((suggestion) => {
    const div = document.createElement("div");
    div.classList.add("suggestion-item");
    div.textContent = suggestion;
    div.addEventListener("click", function () {
      input.value = suggestion;
      suggestionsBox.style.display = "none";
      console.log(div);
      console.log(div);
    });
    suggestionsBox.appendChild(div);
  });

  suggestionsBox.style.display = "block";
});

document.addEventListener("click", function (event) {
  if (!input.contains(event.target) && !suggestionsBox.contains(event.target)) {
    suggestionsBox.style.display = "none";
  }
});
