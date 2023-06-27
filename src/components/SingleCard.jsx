import "./SingleCard.css";
export default function SingleCard({ card, handleChoise, flipped, disable }) {
  const hanldeClick = () => {
    if (!disable) {
      handleChoise(card);
    }
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card-front" />
        <img
          onClick={hanldeClick}
          className="back"
          src="/images/cover.jpg"
          alt="card-back"
        />
      </div>
    </div>
  );
}
