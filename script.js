const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // <-- Replace with your API key

async function getWeather() {
  const city = document.getElementById("city-input").value.trim();
  const errorMessage = document.getElementById("error-message");
  const weatherResult = document.getElementById("weather-result");

  if (!city) {
    errorMessage.textContent = "Please enter a city name.";
    errorMessage.classList.remove("hidden");
    weatherResult.classList.add("hidden");
    return;
  }

  errorMessage.classList.add("hidden");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    document.getElementById("city-name").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("temperature").textContent = `Temperature: ${data.main.temp} °C`;
    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById("weather-icon").alt = data.weather[0].description;

    weatherResult.classList.remove("hidden");
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove("hidden");
    weatherResult.classList.add("hidden");
  }
}
