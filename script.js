// ✅ Your OpenWeatherMap API Key (replace with your own)
const API_KEY = "YOUR_API_KEY_HERE";

// ✅ Function to fetch and display weather
async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherDiv = document.getElementById("weather");

  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  weatherDiv.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();

    if (data.cod === "404") {
      weatherDiv.innerHTML = "<p>City not found. Please try again!</p>";
      document.body.style.background = "linear-gradient(to right, #2980b9, #6dd5fa)"; // default bg
      return;
    }

    // Display weather info
    weatherDiv.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>🌡️ Temperature: ${data.main.temp} °C</p>
      <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>☁️ Conditions: ${data.weather[0].description}</p>
    `;

    // ✅ Change background dynamically based on weather
    changeBackground(data.weather[0].main);

  } catch (error) {
    weatherDiv.innerHTML = "<p>Error fetching data. Try again later.</p>";
    console.error(error);
  }
}

// ✅ Function to set background based on weather condition
function changeBackground(condition) {
  condition = condition.toLowerCase();
  if (condition.includes("cloud")) {
    document.body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
  } else if (condition.includes("rain") || condition.includes("drizzle")) {
    document.body.style.background = "linear-gradient(to right, #4e54c8, #8f94fb)";
  } else if (condition.includes("clear")) {
    document.body.style.background = "linear-gradient(to right, #56ccf2, #2f80ed)";
  } else if (condition.includes("snow")) {
    document.body.style.background = "linear-gradient(to right, #e6dada, #274046)";
  } else if (condition.includes("thunderstorm")) {
    document.body.style.background = "linear-gradient(to right, #373b44, #4286f4)";
  } else if (condition.includes("mist") || condition.includes("fog")) {
    document.body.style.background = "linear-gradient(to right, #606c88, #3f4c6b)";
  } else {
    // default background
    document.body.style.background = "linear-gradient(to right, #2980b9, #6dd5fa)";
  }
}
