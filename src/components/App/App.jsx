import "./App.css";
import "../../index.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { useEffect, useState } from "react";
import { ModalWithForm } from "../ModalWithForm/ModalWithForm";
import { ItemModal } from "../ItemModal/ItemModal";
import { getWeather, parseWeatherData } from "../../utils/WeatherApi.jsx";
import { coordinates, APIkey } from "../../utils/Constants.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const parsedData = parseWeatherData(data);
        setWeatherData(parsedData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="App">
      <div className="App__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
      </div>
      <ModalWithForm
        buttonText="Add garment"
        title="New garment"
        activeModal={activeModal}
        closeActiveModal={closeActiveModal}
      >
        <label htmlFor="Name" className="modal__label">
          Name <input type="text" placeholder="Name" className="modal__input" />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Name{" "}
          <input
            type="url"
            placeholder="image URL"
            className="modal__input"
            id="imageUrl"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input type="radio" id="hot" className="modal__radio-input" />
            Hot
          </label>
          <label
            htmlFor="warm"
            id="warm"
            className="modal__label modal__label_type_radio"
          >
            <input type="radio" id="warm" className="modal__radio-input" />
            Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input type="radio" id="cold" className="modal__radio-input" />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        closeActiveModal={closeActiveModal}
      />
    </div>
  );
}

export default App;
