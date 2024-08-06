import "./ItemModal.css";

export function ItemModal({ activeModal, card, closeActiveModal }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content-img modal__content_type_image">
        <button onClick={closeActiveModal} className="modal__close"></button>
        <img src={card.link} alt={card.Name} className="modal__image" />
        <div className="modal__footer">
          <p className="modal__caption">{card.Name}</p>
          <p className="modal__weather">Weather: {card.Weather}</p>
        </div>
      </div>
    </div>
  );
}
