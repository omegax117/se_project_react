import "../SideBar/SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext, useState } from "react";

function SideBar({ handleEditProfileClick, handleLogout }) {
  const user = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__user-wrap">
        <img
          src={user.avatar}
          alt="profile_picture"
          className="sidebar__avatar"
        />
        <p className="sidebar__username">{user.name}</p>
      </div>
      <button
        type="button"
        className="sidebar__profile-btn"
        onClick={handleEditProfileClick}
      >
        Change profile data
      </button>
      <button
        type="button"
        className="sidebar__profile-btn"
        onClick={handleLogout}
      >
        Log Out
      </button>
    </div>
  );
}

export default SideBar;
