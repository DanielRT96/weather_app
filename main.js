const weatherApi =
  "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=Budapest&appid=2e0f37fe8a0d411129e27f36b2a7a02f";

//DOMs strings
const cityName = document.querySelector(".city__name");
const lowestTemp = document.querySelector(".lowest__temperature");
const highestTemp = document.querySelector(".highest__temperature");
const todayName = document.querySelector(".today__name");
const todayDate = document.querySelector(".today__date");
const todayWind = document.querySelector(".today__wind");
const rainChance = document.querySelector(".rain");
const currentStatusStr = document.querySelector(".current__status__string");
const currentCelsius = document.querySelector(".current__celsius");
const day = document.querySelector(".day");
const celsius = document.querySelector(".celsius");

// // // API Call
async function callAPI(apiURL) {
  try {
    const result = await fetch(apiURL);
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

//Budapest
const baseWeather = async () => {
  const data = await callAPI(weatherApi);

  cityName.innerHTML = data.city.name;

  let date_string = data.list[0].dt_txt;
  let dateApi = new Date(date_string);
  todayName.innerHTML = getTodayString(dateApi.getDay());
  todayDate.innerHTML = dateApi.toLocaleDateString("en-US");

  let windSpeed = Math.round(data.list[0].wind.speed);
  todayWind.innerHTML = `Wind ${windSpeed}km/h`;

  //let chanceRain = data.list[0].rain.3h * 100;
  //lowestTemp.innerHTML = celsiusCalc(data.list[0].main.temp_min);
  //highestTemp.innerHTML = celsiusCalc(data.list[0].main.temp_max);
  console.log(data);
};

const getTodayString = (todayNumber) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let todayString = days[todayNumber];
  return todayString;
};

const celsiusCalc = (fahrenheit) => {
  let fTemp = fahrenheit;
  let fToC = Math.round((fTemp - 32) / 1.8);
  console.log(fToC);
  return fToC;
};

baseWeather();


const updateUi = () => {

}

let d = new Date();
console.log(d);