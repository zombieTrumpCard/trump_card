import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SingleCard from "../components/SingleCard";

export default function GameNormal() {
  const cardImages = [
    { src: "/cardFront/SpadeQ.png", matched: false },
    { src: "/cardFront/SpadeK.png", matched: false },
    { src: "/cardFront/SpadeJ.png", matched: false },
    { src: "/cardFront/Spade10.png", matched: false },
    { src: "/cardFront/Spade9.png", matched: false },
    { src: "/cardFront/Spade8.png", matched: false },
    { src: "/cardFront/Spade7.png", matched: false },
    { src: "/cardFront/Spade6.png", matched: false },
    { src: "/cardFront/Spade5.png", matched: false },
    { src: "/cardFront/Spade4.png", matched: false },
    { src: "/cardFront/Spade3.png", matched: false },
    { src: "/cardFront/Spade2.png", matched: false },
    { src: "/cardFront/Spade1.png", matched: false },
    { src: "/cardFront/Joker.png", matched: false },
    { src: "/cardFront/HeartQ.png", matched: false },
    { src: "/cardFront/HeartK.png", matched: false },
    { src: "/cardFront/HeartJ.png", matched: false },
    { src: "/cardFront/Heart10.png", matched: false },
    { src: "/cardFront/Heart9.png", matched: false },
    { src: "/cardFront/Heart8.png", matched: false },
    { src: "/cardFront/Heart7.png", matched: false },
    { src: "/cardFront/Heart6.png", matched: false },
    { src: "/cardFront/Heart5.png", matched: false },
    { src: "/cardFront/Heart4.png", matched: false },
    { src: "/cardFront/Heart3.png", matched: false },
    { src: "/cardFront/Heart2.png", matched: false },
    { src: "/cardFront/Heart1.png", matched: false },
    { src: "/cardFront/DiaQ.png", matched: false },
    { src: "/cardFront/DiaK.png", matched: false },
    { src: "/cardFront/DiaJ.png", matched: false },
    { src: "/cardFront/Dia10.png", matched: false },
    { src: "/cardFront/Dia9.png", matched: false },
    { src: "/cardFront/Dia8.png", matched: false },
    { src: "/cardFront/Dia7.png", matched: false },
    { src: "/cardFront/Dia6.png", matched: false },
    { src: "/cardFront/Dia5.png", matched: false },
    { src: "/cardFront/Dia4.png", matched: false },
    { src: "/cardFront/Dia3.png", matched: false },
    { src: "/cardFront/Dia2.png", matched: false },
    { src: "/cardFront/Dia1.png", matched: false },
    { src: "/cardFront/CloverQ.png", matched: false },
    { src: "/cardFront/CloverK.png", matched: false },
    { src: "/cardFront/CloverJ.png", matched: false },
    { src: "/cardFront/Clover10.png", matched: false },
    { src: "/cardFront/Clover9.png", matched: false },
    { src: "/cardFront/Clover8.png", matched: false },
    { src: "/cardFront/Clover7.png", matched: false },
    { src: "/cardFront/Clover6.png", matched: false },
    { src: "/cardFront/Clover5.png", matched: false },
    { src: "/cardFront/Clover4.png", matched: false },
    { src: "/cardFront/Clover3.png", matched: false },
    { src: "/cardFront/Clover2.png", matched: false },
    { src: "/cardFront/Clover1.png", matched: false },
  ];

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null); // 첫 번째 선택
  const [choiceTwo, setChoiceTwo] = useState(null); // 두 번째 선택
  const [disabled, setDisabled] = useState(false); // 세 번째 선택 막기
  const [seconds, setSeconds] = useState(122); // 타이머 시간
  const [isInitialRender, setIsInitialRender] = useState(true); // 초기 렌더링
  const [matchedCount, setMatchedCount] = useState(0); // 매치된 카드 개수
  const [totalScore, setTotalScore] = useState(0);
  const [totalPoint, setTotalPoint] = useState(0);

  const navigate = useNavigate();
  const nowLevel = "Normal";

  // 타이머 설정
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1); // 1초마다 초 감소
    }, 1000);
    // 컴포넌트가 언마운트되거나 업데이트되기 전에 타이머를 정리(cleanup)
    return () => clearInterval(timer);
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 타이머 설정

  // 카드 개수 제한
  const getRandomCards = () => {
    const shuffledCards = [...cardImages].sort(() => 0.5 - Math.random()); // 배열을 랜덤하게 섞음
    return shuffledCards.slice(0, 12);
  };
  const randomCard = getRandomCards();

  // 카드 섞기
  const shuffleCards = () => {
    setIsInitialRender(true);
    const shuffledCards = [...randomCard, ...randomCard]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    // 시작하고 2초 동안 카드 보여주기
    setTimeout(() => {
      setIsInitialRender(false);
    }, 2000);
  };

  // 게임 재시작
  const restart = () => {
    setSeconds(122)
    setIsInitialRender(true);
    const shuffledCards = [...randomCard, ...randomCard]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0)
    setTotalScore(0);
    setTotalPoint(0);
    // 시작하고 2초 동안 카드 보여주기
    setTimeout(() => {
      setIsInitialRender(false);
    }, 2000);
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

  // 카드 전부 맞추면 다시 깔기
  useEffect(() => {
    const matchedCardCount = cards.filter((card) => card.matched).length;
    setMatchedCount(matchedCardCount);
  }, [cards]);

  useEffect(() => {
    if (matchedCount === cards.length) {
      setTimeout(() => shuffleCards(), 100); // 0.1초 후에 카드를 다시 섞음
    }
  }, [matchedCount]);

 // Game Score 계산
 const calculateScore = () => {
  const matchedCard = cards.filter((card) => card.matched);
  if(matchedCard && matchedCard.length > 0){
    const newScore = 100;
    // 이전 스코어가 있다면 가져오기
    const updateScore = totalScore + newScore;
    setTotalScore(updateScore);
  }
};

  // Game Point 계산
  const calculatePoint = () => {
    const matchedCard = cards.filter((card) => card.matched);
    if(matchedCard && matchedCard.length > 0){
      const newPoint = 1;
      // 이전 포인트가 있다면 가져오기
      const updatePoint = totalPoint + newPoint;
      setTotalPoint(updatePoint);
    }
  };

  useEffect(() => {
    calculateScore();
    calculatePoint();
  }, [cards]);

  // 게임 종료
  useEffect(() => {
    if (seconds === 0) {
      // 타이머가 0이 되면 페이지 전환을 수행합니다.
      navigate("/gameover", { state: { totalScore, totalPoint, nowLevel } });
    }
  }, [seconds, navigate]);

  return (
    <div className="background">
      <Link to="/" className="homeBtn">
        HOME
      </Link>
      <div className="normalGameBackground">
        <p>Level: {nowLevel} / Turns: {turns} / Score: {totalScore} / Timer: {seconds}</p>
        <div className="cardGrid">
          {cards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={
                isInitialRender ||
                card === choiceOne ||
                card === choiceTwo ||
                card.matched
              }
              disabled={disabled}
            />
          ))}
        </div>
      </div>
      <button className="RestartBtn" onClick={restart}>
          Restart
        </button>
      <div className="rabbitIcon" />
    </div>
  );
}