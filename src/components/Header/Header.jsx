import "./Header.css";
import pfp from "../../assets/pfp.jpg";
import Logo from "../../assets/Logo.svg";
import addbase from "../../assets/addbase.svg";

export default function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <img src={Logo} alt="What to wear logo" className="header__logo" />
      <p className="header__info">
        {currentDate}, {weatherData.city}
      </p>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + add clothes
      </button>
      <div className="header__user-container">
        <p className="header__user-name">Alex Sturm</p>
        <img
          src={pfp}
          alt="User profile picture"
          className="header__user-pfp"
        />
      </div>
    </header>
  );
}
