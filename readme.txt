Running the Project Locally

Prerequisites

Make sure you have the following installed on your system:

A modern web browser (Chrome, Firefox, Edge, etc.)

A code editor (VS Code, Sublime Text, etc.)

A stable internet connection

Steps to Run

Clone the Repository

git clone https://github.com/your-username/weather-app.git

Navigate to the Project Folder

cd weather-app

Open the Project in a Live Server (Optional but Recommended)

If you have the Live Server extension in VS Code, right-click on index.html and select "Open with Live Server".

Or, open index.html in your web browser manually.

Enter a City or Allow Location Access

Search for any city in the input field to get weather details.

Click the "Use My Location" button to fetch weather data using geolocation.



Approach & Challenges Faced

🔹 Approach

Fetch Weather Data

Used the fetch() method to retrieve weather data from an external API (e.g., OpenWeatherMap).

Displayed temperature, humidity, wind speed, and weather conditions dynamically.

Search by City

Implemented an input field where users can type a city name and fetch real-time weather updates.

Geolocation API

Used the navigator.geolocation.getCurrentPosition() method to retrieve latitude and longitude.

Converted latitude/longitude to a city name using Reverse Geocoding.

Passed the location data to the weather API.