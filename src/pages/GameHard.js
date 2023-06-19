import React, { useEffect, useState } from 'react';
import SingleCard from '../components/SingleCard';

export default function GameHard() {
  const cardImages = [
    { src: '/cardFront/SpadeQ.png', matched: false },
    { src: '/cardFront/SpadeK.png', matched: false },
    { src: '/cardFront/SpadeJ.png', matched: false },
    { src: '/cardFront/Spade10.png', matched: false },
    { src: '/cardFront/Spade9.png', matched: false },
    { src: '/cardFront/Spade8.png', matched: false },
    { src: '/cardFront/Spade7.png', matched: false },
    { src: '/cardFront/Spade6.png', matched: false },
    { src: '/cardFront/Spade5.png', matched: false },
    { src: '/cardFront/Spade4.png', matched: false },
    { src: '/cardFront/Spade3.png', matched: false },
    { src: '/cardFront/Spade2.png', matched: false },
    { src: '/cardFront/Spade1.png', matched: false },
    { src: '/cardFront/Joker.png', matched: false },
    { src: '/cardFront/HeartQ.png', matched: false },
    { src: '/cardFront/HeartK.png', matched: false },
    { src: '/cardFront/HeartJ.png', matched: false },
    { src: '/cardFront/Heart10.png', matched: false },
    { src: '/cardFront/Heart9.png', matched: false },
    { src: '/cardFront/Heart8.png', matched: false },
    { src: '/cardFront/Heart7.png', matched: false },
    { src: '/cardFront/Heart6.png', matched: false },
    { src: '/cardFront/Heart5.png', matched: false },
    { src: '/cardFront/Heart4.png', matched: false },
    { src: '/cardFront/Heart3.png', matched: false },
    { src: '/cardFront/Heart2.png', matched: false },
    { src: '/cardFront/Heart1.png', matched: false },
    { src: '/cardFront/DiaQ.png', matched: false },
    { src: '/cardFront/DiaK.png', matched: false },
    { src: '/cardFront/DiaJ.png', matched: false },
    { src: '/cardFront/Dia10.png', matched: false },
    { src: '/cardFront/Dia9.png', matched: false },
    { src: '/cardFront/Dia8.png', matched: false },
    { src: '/cardFront/Dia7.png', matched: false },
    { src: '/cardFront/Dia6.png', matched: false },
    { src: '/cardFront/Dia5.png', matched: false },
    { src: '/cardFront/Dia4.png', matched: false },
    { src: '/cardFront/Dia3.png', matched: false },
    { src: '/cardFront/Dia2.png', matched: false },
    { src: '/cardFront/Dia1.png', matched: false },
    { src: '/cardFront/CloverQ.png', matched: false },
    { src: '/cardFront/CloverK.png', matched: false },
    { src: '/cardFront/CloverJ.png', matched: false },
    { src: '/cardFront/Clover10.png', matched: false },
    { src: '/cardFront/Clover9.png', matched: false },
    { src: '/cardFront/Clover8.png', matched: false },
    { src: '/cardFront/Clover7.png', matched: false },
    { src: '/cardFront/Clover6.png', matched: false },
    { src: '/cardFront/Clover5.png', matched: false },
    { src: '/cardFront/Clover4.png', matched: false },
    { src: '/cardFront/Clover3.png', matched: false },
    { src: '/cardFront/Clover2.png', matched: false },
    { src: '/cardFront/Clover1.png', matched: false },
  ];

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // 카드 개수 제한
  const getRandomCards = () => {
    const shuffledCards = [...cardImages].sort(() => 0.5 - Math.random()); // 배열을 랜덤하게 섞음
    return shuffledCards.slice(0, 16);
  };
  const randomCard = getRandomCards();

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...randomCard, ...randomCard]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // handle of choice
  const handleChoice = (card) => {
    if (choiceOne) {
      setChoiceTwo(card);
    } else {
      setChoiceOne(card);
    }
  };

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );

        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // start a new game automagically
  useEffect(() => {
    shuffleCards();
  }, []);

  // Game Score 계산
  const [totalScore, setTotalScore] = useState(0);
  const updateScore = () => {
    const matchedCardsCount = cards.filter((card) => card.matched).length;
    const newScore = matchedCardsCount * 100 / 2;
    setTotalScore(newScore);
  };
  useEffect(() => {
    updateScore();
  }, [cards]);

  return (
    <div className="GameBackground">
      <button className="RestartBtn" onClick={shuffleCards}>
        Restart
      </button>
      <p>Turns: {turns}</p>
      <p>Score: {totalScore}</p>
      <div className="cardGrid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}
