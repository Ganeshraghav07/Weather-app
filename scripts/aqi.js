
const apiKey = "b376483ccd681e040f9c573d3eae2f2f";
const aqiCity = localStorage.getItem("city");
if (!aqiCity) {
  alert("Please search a city from home page first.");
  window.location.href = "../index.html";
}
async function getAQI() {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`);
  const data = await res.json();
  const air = data.current.air_quality;
  document.getElementById("aqiData").innerHTML = `
      <p>CO: ${air.co} μg/m³</p>
      <p>NO: ${air.no} μg/m³</p>
      <p>NO2: ${air.no2} μg/m³</p>
      <p>O3: ${air.o3} μg/m³</p>
      <p>SO2: ${air.so2} μg/m³</p>
      <p>PM2.5: ${air.pm2_5} μg/m³</p>
      <p>PM10: ${air.pm10} μg/m³</p>
      <p>AQI Index: ${aqiIndex} (1=Good, 5=Very Poor)</p>
    `;}
getAQI();
