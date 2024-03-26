const apiKey = "0ae4e603074545c581980930241403"; // Your API key
var city = "Chandigarh"; // Initial city value

let button = document.getElementById("search");
let requestData; // Define requestData in a broader scope
let er = document.getElementById("error");
let weatherIcon = document.getElementById("weatherIcon");
let cityName = document.getElementById("cityName");
let temp_c = document.getElementById("temp");
let detail = document.getElementById("detail");
let windSpeed = document.getElementById("wind-speed");
let humidity = document.getElementById("Humidity");
let Visibility = document.getElementById("Visibility");
let uvIndex = document.getElementById("uv-index");

async function fetchWeatherData(cityName) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=5&aqi=yes&alerts=no`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    requestData = data;
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
    showsnack(error); // Call showsnack function with the error message
  }
}

function convertDate(inputdate) {
  const outputDate = inputdate.toLocaleString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
  return outputDate;
}

function setDate(dateNumber, idName) {
  let next_date = requestData.forecast.forecastday[dateNumber].date;
  let date = new Date(next_date);
  let formattedDate = convertDate(date);
  document.getElementById(idName).innerText = formattedDate;
}

async function showWeather() {
  var city = document.getElementById("inputValue").value || "Chandigarh"; 
  await fetchWeatherData(city);

  weatherIcon.setAttribute(
    "src",
    `https:${requestData.current.condition.icon}`
  );
  cityName.innerText = `${requestData.location.name}, ${requestData.location.country}`;
  temp_c.innerText = `${requestData.current.temp_c}°C`;
  detail.innerText = `${requestData.current.condition.text}`;

  var d = new Date(requestData.location.localtime);
  const inputdate = new Date(d);

  const outputDate = inputdate.toLocaleString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
  document.getElementById("date").innerText = `Today: ${outputDate}`;
  windSpeed.innerText = ` ${requestData.current.wind_kph} kph`;
  humidity.innerText = `${requestData.current.humidity}%`;
  Visibility.innerText = `${requestData.current.vis_km}KM`;
  uvIndex.innerText = `${requestData.current.uv} `;

  for (let i = 1; i < 5; i++) {
    document.getElementById(`weatherdetail${i}`).innerText = requestData.forecast.forecastday[i].day.condition.text;
    setDate(i, `next-date${i}`);
    document.getElementById(`temp${i}`).innerText =requestData.forecast.forecastday[i].day.avgtemp_c;
    document.getElementById(`image${i}`).setAttribute("href",`http:${requestData.forecast.forecastday[i].day.condition.icon}`);
    document.getElementById(`mintemp${i}`).innerText =requestData.forecast.forecastday[i].day.mintemp_c;
    document.getElementById(`maxtemp${i}`).innerText =requestData.forecast.forecastday[i].day.maxtemp_c;
  }
}
const inputField = document.getElementById("inputValue");
inputField.addEventListener("keypress", function(event) {
  if (event.keyCode === 13 || event.which === 13) {
    showWeather();
  }
});
button.addEventListener("click", showWeather);
window.addEventListener("load", showWeather);
