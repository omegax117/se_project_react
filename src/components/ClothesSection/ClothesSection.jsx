import { DefaultClothingItems } from "../../utils/Constants";
import "./ClothesSection.css";
import { ItemCard } from "../ItemCard/ItemCard";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  onCardLike,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );
  return (
    <div className="clothes-section">
      <div className="clothes-section__info">
        <p className="clothes-section__title">Your Items</p>
        <button
          onClick={handleAddClick}
          className="clothes-section__add-button"
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__list">
        {userItems.length > 0 ? (
          userItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              isLoggedIn={isLoggedIn}
            />
          ))
        ) : (
          <p className="clothes-section__list">No items found</p>
        )}
      </ul>
    </div>
  );
}

export default ClothesSection;
