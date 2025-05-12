const apiKey = "c350ab9eac2b4f5289881429251205";

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
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;
    console.log("Fetching weather for:", city);
    const res = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error("City not found or API error");
    }

    const data = await res.json();
    const current = data.current;

   result.innerHTML = `
  <div class="weather-card">
    <h2>${data.location.name}</h2>
    <img src="https:${current.condition.icon}" />
    <p>${current.condition.text}</p>
    <p>Temperature: ${current.temp_c}°C</p>
    <p>Humidity: ${current.humidity}%</p>
    <p>Wind: ${current.wind_kph} kph</p>
  </div>
`;

  } catch (err) {
    console.error("Error:", err);
    result.innerHTML = `<p style="color:red">City not found or invalid input!</p>`;
  }
});
