import "./ModalWithForm.css";

export function ModalWithForm({
  children,
  buttonText,
  title,
  closeActiveModal,
  isOpen,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <form action="" className="modal__form">
          <h2 className="modal__title">{title}</h2>
          <button
            type="button"
            onClick={closeActiveModal}
            className="modal__close"
            id="close-btn"
          />
          {children}
          <button className="modal__submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
