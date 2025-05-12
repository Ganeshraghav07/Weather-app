
const apiKey = "c350ab9eac2b4f5289881429251205";
const aqiCity = localStorage.getItem("city");
if (!aqiCity) {
  alert("Please search a city from home page first.");
  window.location.href = "../index.html";
}
async function getAQI() {
  const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${aqiCity}&aqi=yes`);
  const data = await res.json();
  const air = data.current.air_quality;
  document.getElementById("aqiData").innerHTML = `
    <p>CO: ${air.co}</p>
    <p>NO2: ${air.no2}</p>
    <p>O3: ${air.o3}</p>
    <p>PM2.5: ${air.pm2_5}</p>
    <p>PM10: ${air.pm10}</p>
    <p>US EPA Index: ${air["us-epa-index"]}</p>
  `;
}
getAQI();