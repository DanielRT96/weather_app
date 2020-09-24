// const weatherApi = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=Budapest&appid=2e0f37fe8a0d411129e27f36b2a7a02f";

//DOMs strings
const cityName = document.querySelector(".city__name");
const lowestTemp = document.querySelector(".lowest__temperature");
const highestTemp = doucument.querySelector(".highest__temperature");
const todayName = doucument.querySelector(".today__name");
const todayDate = doucument.querySelector(".today__date");
const todayWind = doucument.querySelector(".today__wind");
const rain = doucument.querySelector(".rain");
const currentStatusStr = doucument.querySelector(".current__status__string");
const currentCelsius = doucument.querySelector(".current__celsius");
const day = doucument.querySelector(".day");






// // API Call
async function callAPI(apiURL) {
  try {
    const result = await fetch(apiURL);
    const data = await result.json();
    console.log(data);
    cityName.innerHTML = data.city.name;
  } catch (error) {
    console.log(error);
  }
}

callAPI(weatherApi);
