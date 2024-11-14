import { useContext } from "react";
import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser._id);
  const card__like_btn = isLiked ? "card__liked" : "card__unliked";
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike(item._id, isLiked);
    console.log(item._id);
  };

  return (
    <li className="card">
      <div className="card__title-wrapper">
        <h2 className="card__name">{item.name}</h2>
        <button
          className={isLoggedIn ? card__like_btn : "card__like_btn_hidden"}
          type="button"
          onClick={handleLike}
        ></button>
      </div>
      <img
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
        className="card__img"
      />
    </li>
  );
}
