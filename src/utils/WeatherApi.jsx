import { processServerRequest } from "./api";

export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(processServerRequest);
};

export const parseWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = data.main.temp;
  result.type = getWeatherType(result.temp);
  result.math = {
    temp: {
      F: Math.round(result.temp),
      C: Math.round(((result.temp - 32) * 5) / 9),
    },
  };
  return result;
};

const getWeatherType = (temperature) => {
  if (temperature > 86) {
    return "hot";
  } else if (temperature >= 66 && temperature < 86) {
    return "warm";
  } else {
    return "cold";
  }
};
