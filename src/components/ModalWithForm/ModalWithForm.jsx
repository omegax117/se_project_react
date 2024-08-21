import "./ModalWithForm.css";

export function ModalWithForm({
  children,
  ButtonText,
  title,
  closeActiveModal,
  isOpen,
  onSubmit,
}) {
  return (
    <div className={`modal ${isOpen ? "modal__opened" : "add-garment"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          onClick={closeActiveModal}
          className="modal__close"
          id="close-btn"
        />
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button className="modal__submit" type="submit">
            {ButtonText}
          </button>
        </form>
      </div>
    </div>
  );
}
