import { useEffect, useState } from "react";
import { ModalWithForm } from "../ModalWithForm/ModalWithForm";

const EditProfileModal = ({
  isOpen,
  onCloseModal,
  onUpdate,
  currentUser,
  isLoading,
}) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
    console.log(currentUser);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdate({ name, avatar });
  }

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setAvatar(currentUser.avatar);
      console.log(currentUser);
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      ButtonText={isLoading ? "Updating" : "Next"}
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
          placeholder="new name"
          className="modal__input"
          minLength={2}
          maxLength={40}
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="NewAvatar" className="modal__label">
        Avatar*{" "}
        <input
          type="url"
          id="NewAvatar"
          placeholder="url"
          className="modal__input"
          minLength={2}
          maxLength={250}
          value={avatar}
          onChange={handleAvatarChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
