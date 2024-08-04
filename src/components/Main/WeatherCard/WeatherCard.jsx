import Sunny from "../../../Assets/Sunny.svg";
import "../WeatherCard/WeatherCard.css";

export default function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F} &deg; F</p>
      <img src={Sunny} alt="" className="weather-card__img" />
    </section>
  );
}
