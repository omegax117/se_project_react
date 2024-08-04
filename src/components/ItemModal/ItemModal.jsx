import "./itemModal.css";

export function ItemModal({ activeModal, card, closeActiveModal }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal__opened"}`}>
      <div className="modal__content-img modal__content_type_image">
        <button onClick={closeActiveModal} className="modal__close"></button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <p className="modal__caption">{card.name}</p>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}
