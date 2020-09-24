// const weatherApi ="https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=Budapest&appid=2e0f37fe8a0d411129e27f36b2a7a02f";

//DOMs strings
const cityName = document.querySelector(".city__name");
const lowestTemp = document.querySelector(".lowest__temperature");
const highestTemp = document.querySelector(".highest__temperature");
const todayName = document.querySelector(".today__name");
const todayDate = document.querySelector(".today__date");
const todayWind = document.querySelector(".today__wind");
const rain = document.querySelector(".rain");
const currentStatusStr = document.querySelector(".current__status__string");
const currentCelsius = document.querySelector(".current__celsius");
const day = document.querySelector(".day");
const celsius = document.querySelector(".celsius");

// // API Call
// async function callAPI(apiURL) {
//   try {
//     const result = await fetch(apiURL);
//     const data = await result.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }

const weatherData = JSON.parse("data");
console.log(weatherData);
// callAPI(weatherApi);
