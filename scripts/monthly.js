
const apiKey = "c350ab9eac2b4f5289881429251205";
const monthlyCity = localStorage.getItem("city");
if (!monthlyCity) {
  alert("Please search a city from home page first.");
  window.location.href = "../index.html";
}
async function getMonthly() {
  const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${monthlyCity}&days=15&aqi=no&alerts=no`);
  const data = await res.json();
  const days = data.forecast.forecastday;
  document.getElementById("monthlyData").innerHTML = days.map(day => `
    <div>
      <p><strong>${day.date}</strong></p>
      <p>${day.day.avgtemp_c}°C</p>
      <p>${day.day.condition.text}</p>
      <img src="https:${day.day.condition.icon}" />
    </div>
  `).join("");
}
getMonthly();
