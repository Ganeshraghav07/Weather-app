const apiKey = "b376483ccd681e040f9c573d3eae2f2f";

function toPascalCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

document.getElementById("searchForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  let cityInput = document.getElementById("cityInput").value.trim();

  if (!cityInput) {
    alert("Please enter a city name.");
    return;
  }

  const city = toPascalCase(cityInput);
  localStorage.setItem("city", city);

  const result = document.getElementById("resultArea");

  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    console.log("Fetching weather for:", city);
    const res = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error("City not found or API error");
    }

    const data = await res.json();

    result.innerHTML = `
      <div class="weather-card">
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon"/>
        <p>${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind: ${data.wind.speed} m/s</p>
      </div>
    `;

  } catch (err) {
    console.error("Error:", err);
    result.innerHTML = `<p style="color:red">City not found or invalid input!</p>`;
  }
});

