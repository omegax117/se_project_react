import "./ModalWithForm.css";
import addbase from "../../assets/addbase.svg";

export function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  closeActiveModal,
}) {
  return (
    <div
      className={`modal ${activeModal === "add-garment" && "modal__opened"}`}
    >
      <div className="modal__content">
        <form action="" className="modal__form">
          <h2 className="modal__title">{title}</h2>
          <button
            type="button"
            onClick={closeActiveModal}
            className="modal__close"
            id="close-btn"
          ></button>
          {children}
          <button className="modal__submit" type="submit">
            <img src={addbase} alt="" />
          </button>
        </form>
      </div>
    </div>
  );
}
