import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/images/1.jpg", matched: false },
  { src: "/images/2.jpg", matched: false },
  { src: "/images/3.jpg", matched: false },
  { src: "/images/4.jpg", matched: false },
  { src: "/images/5.jpg", matched: false },
  { src: "/images/6.jpg", matched: false },
];

function App() {
  const [cards, setCrds] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiseOne, setChoiceOne] = useState(null);
  const [choiseTwo, setChoiceTwo] = useState(null);
  const [disable, setDisable] = useState(false);

  const shuffleCard = () => {
    const shuffled = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCrds(shuffled);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  const handleChoise = (card) => {
    choiseOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiseOne && choiseTwo) {
      setDisable(true);
      if (choiseOne.src === choiseTwo.src) {
        setCrds((prevCard) => {
          return prevCard.map((card) => {
            if (card.src === choiseOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1500);
      }
    }
  }, [choiseOne, choiseTwo]);
  console.log(cards);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => prevTurn + 1);
    setDisable(false);
  };
  useEffect(() => {
    shuffleCard();
  }, []);
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCard}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            card={card}
            key={card.id}
            disable={disable}
            handleChoise={handleChoise}
            flipped={card === choiseOne || card === choiseTwo || card.matched}
          />
        ))}
      </div>
      <p>turns : {turns}</p>
    </div>
  );
}

export default App;
