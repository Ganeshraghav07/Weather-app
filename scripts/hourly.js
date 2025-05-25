const apiKey = "b376483ccd681e040f9c573d3eae2f2f";
const hourlyCity = localStorage.getItem("city");
if (!hourlyCity) {
  alert("Please search a city from home page first.");
  window.location.href = "../index.html";
}
async function getHourly() {
  const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${hourlyCity}&days=1&aqi=no&alerts=no`);
  const data = await res.json();
  const hours = data.forecast.forecastday[0].hour;

  document.getElementById("hourlyData").innerHTML = hours.map(hour => `
    <div>
      <p><strong>${hour.time.split(" ")[1]}</strong></p>
      <p>${hour.temp_c}°C</p>
      <p>${hour.condition.text}</p>
      <img src="https:${hour.condition.icon}" />
    </div>
  `).join("");
}
getHourly();
