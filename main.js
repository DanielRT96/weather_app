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
const cStatus = document.querySelector(".current__status");
const inputBox = document.querySelector(".search__box");

// API Call
async function callAPI(apiURL) {
  try {
    const result = await fetch(apiURL, {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// On Open - Budapest
const baseWeather = async (input) => {
  // API key
  //const weatherApi = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=2e0f37fe8a0d411129e27f36b2a7a02f`;

  //APi call
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

  //Humidity
  let rainVolume = data.list[0].main.humidity;
  rain.innerHTML = `💧${rainVolume}%`;

  //Temperature
  currentCelsius.innerHTML = `${celsiusCalc(data.list[0].main.temp)}°`;
  lowestTemp.innerHTML = `↓${celsiusCalc(data.list[0].main.temp_min)}°`;
  highestTemp.innerHTML = `↑${celsiusCalc(data.list[0].main.temp_max)}°`;

  //Current weather
  let weatherDesc = data.list[0].weather[0].main;
  currentStatusStr.innerHTML = data.list[0].weather[0].description;
  clearElement(".current__weather__picture");
  getIcon(cStatus, weatherDesc);

  // Get next days from API
  let newDataArr = [...data.list];
  let dataArray = newDataArr.map((element) => {
    let dates = new Date(element.dt_txt);
    let dateName = getTodayString(dates.getDay());

    let temperatures = element.main.temp;
    let celsiuses = celsiusCalc(temperatures);
    return new Array(dateName, celsiuses);
  });

  //Load days into UI
  let datesArr = dataArray.map((element) => element[0]);
  let filteredArr = datesArr.filter(
    (item, index) => datesArr.indexOf(item) === index
  );
  filteredArr.shift();
  filteredArr.map((day, index) => {
    let dayElement = document.querySelector(`.day${index}`);
    dayElement.innerHTML = day.substring(0, 3).toUpperCase();
  });

  //Load celsius into UI
  let celArray = filteredArr.map((el) => new Array(el));

  filteredArr.map((el) => {
    let total = 0;
    let dayIndex;
    let numberOfLoops = 0;
    for (let i = 0; i < dataArray.length; i++) {
      if (el === dataArray[i][0]) {
        dayIndex = celArray.findIndex((el) => {
          if (el.includes(dataArray[i][0])) return el;
        });
        total += dataArray[i][1];
        numberOfLoops++;
      }
    }
    celArray[dayIndex].push(Math.round(total / numberOfLoops));
  });

  celArray.map((element, index) => {
    let celElement = document.querySelector(`.celsius${index}`);
    celElement.innerHTML = `${element[1]}°`;
  });
  console.log(dataArray);
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

const getIcon = (parent, weatherDescription) => {
  let weatherText;
  switch (weatherDescription) {
    case "Clear":
      weatherText = "clear";
      break;
    case "Clouds":
      weatherText = "cloudy";
      break;
    case "Rain":
      weatherText = "rain";
      break;
    case "Thunderstorm":
      weatherText = "tstorms";
      break;
    case "Drizzle":
      weatherText = "flurries";
      break;
    case "Snow":
      weatherText = "snow";
      break;
    default:
      weatherText = "clear";
  }

  const weatherIcon = `
    <img
        src="./dist/icons/solid-white/png/256x256/${weatherText}.png"
        alt="" class="current__weather__picture"
    />
  `;
  parent.insertAdjacentHTML("afterbegin", weatherIcon);
};

const clearElement = (classOfEl) => {
  const element = document.querySelector(classOfEl);
  if (element) element.parentElement.removeChild(element);
};

inputBox.addEventListener("keypress", (e) => {
  let input;
  if (e.key === "Enter") {
    input = inputBox.value;
    baseWeather(input);
    inputBox.value = "";
  }
});

baseWeather("Budapest");
