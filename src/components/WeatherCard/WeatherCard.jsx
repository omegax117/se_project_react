import Sunny from "../../Assets/Sunny.svg";
//auto checker on the platform will not accept this with a lowercase sunny
//it detects it as a component.
import "./WeatherCard.css";

export default function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F} &deg; F</p>
      <img
        src={Sunny}
        alt="Image of current weather conditions"
        className="weather-card__img"
      />
    </section>
  );
}
