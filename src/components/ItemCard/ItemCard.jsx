import "./ItemCard.css";

export function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };
  return (
    <li className="card">
      <h2 className="card__name">{item.Name}</h2>
      <img
        onClick={handleCardClick}
        src={item.link}
        alt={item.Name}
        className="card__img"
      />
    </li>
  );
}
