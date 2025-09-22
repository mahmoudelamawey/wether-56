// Arrays for date names
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// API setup
const key = "f1e9f019feda40a19b2151318242507";
let city = "Cairo"; // Default city
const base_url = "https://api.weatherapi.com/v1";

// Get elements
const findBtn = document.getElementById("find");
const findLocation = document.getElementById("findLocation");
const forecastCardsContainer = document.getElementById("forecast-cards");

// Update today's weather
function updateTodayWeather(data) {
  const dateToday = new Date();
  document.getElementById("todayName").textContent = days[dateToday.getDay()];
  document.getElementById("todayDate").textContent = `${dateToday.getDate()} ${months[dateToday.getMonth()]}`;
  document.getElementById("location").textContent = data.location.name;
  document.getElementById("todayTemp").textContent = data.current.temp_c;
  document.getElementById("todayIcon").src = "https:" + data.current.condition.icon;
  document.getElementById("todayCondition").textContent = data.current.condition.text;
  document.getElementById("humidity").textContent = data.current.humidity + "%";
  document.getElementById("wind-speed").textContent = data.current.wind_kph + " km/h";
  document.getElementById("wind-dir").textContent = data.current.wind_dir;
}

// Update forecast cards
function updateForecastCards(data) {
  forecastCardsContainer.innerHTML = ""; // clear previous cards
  for(let i=1; i<data.forecast.forecastday.length; i++){
    const dateNext = new Date(data.forecast.forecastday[i].date);
    const card = document.createElement("div");
    card.className = "col-lg-4 col-md-6 mb-4 p-0";
    card.innerHTML = `
      <div class="forecast-card p-4 rounded-3 bg-custom text-white text-center h-100">
        <div class="day">${dateNext.toLocaleString('en-us',{weekday:'long'})}</div>
        <img src="https:${data.forecast.forecastday[i].day.condition.icon}" alt="" width="90">
        <div class="fs-1">${data.forecast.forecastday[i].day.maxtemp_c}<sup>°</sup>C</div>
        <div class="fs-1">${data.forecast.forecastday[i].day.mintemp_c}<sup>°</sup>C</div>
        <div class="text-primary">${data.forecast.forecastday[i].day.condition.text}</div>
      </div>
    `;
    forecastCardsContainer.appendChild(card);
  }
}

// Fetch data from API
async function getData() {
  try {
    let res = await fetch(`${base_url}/forecast.json?key=${key}&q=${city}&days=3&aqi=no&alerts=no`);
    let data = await res.json();
    console.log(data);
    updateTodayWeather(data);
    updateForecastCards(data);
  } catch(err) {
    alert("Error fetching data, please try again!");
    console.error(err);
  }
}

// Event listener for search
findBtn.addEventListener("click", () => {
  const input = findLocation.value.trim();
  if(input) {
    city = input;
    getData();
  }
});

// Initial fetch
getData();

