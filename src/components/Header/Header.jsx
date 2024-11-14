import "./Header.css";
import Logo from "../../Assets/Logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

export default function Header({
  handleAddClick,
  weatherData,
  handleRegisterClick,
  handleLoginClick,
  isLoggedIn,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const user = useContext(CurrentUserContext);
  // let { currentUser: user } = useContext(CurrentUserContext) || {};
  return (
    <header className="header">
      <Link to="/">
        <img src={Logo} alt="What to wear logo" className="header__logo" />
      </Link>
      <p className="header__info">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {isLoggedIn ? (
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-btn"
        >
          + add clothes
        </button>
      ) : (
        <></>
      )}
      {isLoggedIn ? (
        <Link to="/profile" className="header__link">
          <div className="header__user-container">
            <p className="header__user-name">{user.name}</p>
          </div>
        </Link>
      ) : (
        <p className="header__user-name"></p>
      )}
      {isLoggedIn ? (
        user.avatar ? (
          <img className="header__user-pfp" src={user.avatar} alt="avatar" />
        ) : (
          <span className="header__user-pfp header__user-pfp-none">
            {user.name?.toUpperCase().charAt(0) || ""}
          </span>
        )
      ) : (
        <div>
          <button className="header__add-btn" onClick={handleRegisterClick}>
            Sign Up
          </button>
          <button className="header__add-btn" onClick={handleLoginClick}>
            Log In
          </button>
        </div>
      )}
    </header>
  );
}
