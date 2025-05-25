
const apiKey = "b376483ccd681e040f9c573d3eae2f2f";
const city = localStorage.getItem("city");

if (!city) {
  alert("Please search a city from home page first.");
  window.location.href = "../index.html";
}

async function getTodayWeather() {
  const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`);
  const data = await res.json();
  const current = data.current;

  document.getElementById("todayData").innerHTML = `
    <h2>${data.location.name}</h2>
    <p>${current.condition.text}</p>
    <img src="https:${current.condition.icon}" />
    <p>Temp: ${current.temp_c}°C</p>
    <p>Humidity: ${current.humidity}%</p>
  `;
}
getTodayWeather();
