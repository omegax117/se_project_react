import { useState } from "react";
import { ModalWithForm } from "../ModalWithForm/ModalWithForm";

const EditProfileModal = ({ isOpen, onCloseModal, onUpdate }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdate({ name, avatar });
    setName("");
    setAvatar("");
  }

  return (
    <ModalWithForm
      ButtonText="Next"
      //automated test is seeing this as a component and making it have to be capitalized.
      title="Edit Profile"
      closeActiveModal={onCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="NewName" className="modal__label">
        Name*{" "}
        <input
          type="text"
          id="NewName"
          placeholder="NewName"
          className="modal__input"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="NewAvatar" className="modal__label">
        Avatar{" "}
        <input
          type="url"
          id="NewAvatar"
          placeholder="URL"
          className="modal__input"
          value={avatar}
          onChange={handleAvatarChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
