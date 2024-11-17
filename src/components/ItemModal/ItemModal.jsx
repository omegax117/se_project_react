import "./ItemModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

export function ItemModal({
  activeModal,
  card,
  closeActiveModal,
  handleDelete,
  isLoggedIn,
}) {
  const user = useContext(CurrentUserContext);
  const handleDeleteClick = () => {
    handleDelete(card);
  };
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content-img modal__content_type_image">
        <button onClick={closeActiveModal} className="modal__close"></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <p className="modal__caption">{card.name}</p>
          {card.owner === user._id ? (
            <button className="modal__delete" onClick={handleDeleteClick}>
              Delete Item
            </button>
          ) : (
            ""
          )}
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}
