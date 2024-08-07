import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import { DefaultClothingItems } from "../../utils/Constants";
import { ItemCard } from "../ItemCard/ItemCard.jsx";
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
          {DefaultClothingItems.filter((item) => {
            return item.Weather === weatherData.type;
          }).map((item) => {
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
