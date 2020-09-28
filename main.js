const weatherApi =
  "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=Budapest&appid=2e0f37fe8a0d411129e27f36b2a7a02f";

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
  //CityName
  cityName.innerHTML = data.city.name;

  //Dates
  let date_string = data.list[0].dt_txt;
  let dateApi = new Date(date_string);
  todayName.innerHTML = getTodayString(dateApi.getDay());
  todayDate.innerHTML = dateApi.toLocaleDateString("en-US");

  //Wind
  let windSpeed = Math.round(data.list[0].wind.speed);
  todayWind.innerHTML = `Wind ${windSpeed}km/h`;

  //Chance of Rain
  const string = "3h";
  let rainVolume = data.list[1].rain[string];
  rain.innerHTML = `💧${rainVolume}mm`;

  //Temperature
  currentCelsius.innerHTML = `${celsiusCalc(data.list[0].main.temp)}°`;
  lowestTemp.innerHTML = `↓${celsiusCalc(data.list[0].main.temp_min)}°`;
  highestTemp.innerHTML = `↑${celsiusCalc(data.list[0].main.temp_max)}°`;

  //Current weather
  currentStatusStr.innerHTML = data.list[0].weather[0].description;
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

const celsiusCalc = (kelvin) => {
  let kTemp = kelvin;
  let kToC = Math.round(kTemp - 273.15);
  return kToC;
};

baseWeather();
