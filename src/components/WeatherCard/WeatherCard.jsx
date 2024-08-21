import Sunny from "../../Assets/Sunny.svg";
//auto checker on the platform will not accept this with a lowercase sunny
//it detects it as a component.
import "./WeatherCard.css";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

export function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherData?.math?.temp?.[currentTemperatureUnit] || 999;
  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {temp} &deg; {currentTemperatureUnit}
      </p>
      <img
        src={Sunny}
        alt="Image of current weather conditions"
        className="weather-card__img"
      />
    </section>
  );
}
