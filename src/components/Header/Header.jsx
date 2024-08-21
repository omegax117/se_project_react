import "./Header.css";
import Pfp from "../../Assets/Pfp.jpg";
import Logo from "../../Assets/Logo.svg";
import Addbase from "../../Assets/Addbase.svg";
import Switch from "./Switch/Switch";
import { Link } from "react-router-dom";

export default function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <Link to="/">
        <img src={Logo} alt="What to wear logo" className="header__logo" />
      </Link>
      <p className="header__info">
        {currentDate}, {weatherData.city}
      </p>
      <Switch />
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + add clothes
      </button>
      <Link to="/profile" className="header__link">
        <div className="header__user-container">
          <p className="header__user-name">Alex Sturm</p>
          <img
            src={Pfp}
            alt="User profile picture"
            className="header__user-pfp"
          />
        </div>
      </Link>
    </header>
  );
}
