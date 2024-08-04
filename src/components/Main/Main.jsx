import "./Main.css";
import "./WeatherCard/WeatherCard";
import WeatherCard from "./WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/Constants";
import { ItemCard } from "./ItemCard/ItemCard";
import { Footer } from "../Footer/Footer";
import { ModalWithForm } from "../ModalWithForm/ModalWithForm";

export default function Main({ weatherData, handleCardClick }) {
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp.F} &deg; F / You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
      <Footer />
    </main>
  );
}
