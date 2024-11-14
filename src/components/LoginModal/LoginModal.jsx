import { useState } from "react";
import { ModalWithForm } from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ isOpen, onCloseModal, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({ email, password });
  }

  return (
    <ModalWithForm
      ButtonText="Next"
      //automated test is seeing this as a component and making it have to be capitalized.
      title="Log In"
      closeActiveModal={onCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="Email" className="modal__label">
        Email*{" "}
        <input
          type="email"
          id="Email"
          placeholder="Email"
          className="modal__input"
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label htmlFor="Password" className="modal__label">
        Password*{" "}
        <input
          type="password"
          id="Password"
          placeholder="Password"
          className="modal__input"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
