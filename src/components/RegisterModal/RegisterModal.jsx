import { useState } from "react";
import { ModalWithForm } from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

const RegisterModal = ({ isOpen, onRegister, onCloseModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setUrl] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({ email, password, name, avatar });
  }

  return (
    <ModalWithForm
      ButtonText="Next"
      //automated test is seeing this as a component and making it have to be capitalized.
      title="Sign up"
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
      <label htmlFor="name" className="modal__label">
        Name*{" "}
        <input
          type="text"
          id="name"
          placeholder="Name"
          className="modal__input"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="AvatarUrl" className="modal__label">
        Avatar URL*{" "}
        <input
          type="url"
          placeholder="Avatar URL"
          className="modal__input"
          id="AvatarUrl"
          value={avatar}
          onChange={handleUrlChange}
        />
      </label>
      <button className="modal__alt">or Log in</button>
    </ModalWithForm>
  );
};

export default RegisterModal;
