import React, { useEffect, useState } from 'react';

export default function GameEasy() {
  const CARD_IMG = [
    'spade1',
    'spade2',
    'spade3',
    'spade4',
    'spade5',
    'spade6',
    'spade7',
    'spade8',
    'spade9',
    'spade10',
    'spadeJ',
    'spadeQ',
    'spadeK',
  ];
  const BOARD_SIZE = 24;

  const [stage, setStage] = useState(1); // 게임 스테이지
  const [time, setTime] = useState(60); // 남은 시간
  const [timer, setTimer] = useState(0);
  const [isFlip, setIsFlip] = useState(false); // 카드 뒤집기 가능 여부
  const [cardDeck, setCardDeck] = useState([]);

  // 게임 설정 초기화
  const initGame = () => {
    setStage(1);
    setTime(60);
    setIsFlip(false);
    setCardDeck([]);
  };

  // 게임 화면 초기화
  const initScreen = () => {
    // Code for initializing the game screen
  };

  // 게임 클리어 여부 확인
  const checkGameClear = () => {
    const matchedCards = cardDeck.filter((card) => card.isMatched);
    if (matchedCards.length === BOARD_SIZE) {
      clearInterval(timer); // 타이머 정지
      // 게임 클리어 처리
    }
  };

  // 맞춘 카드인지 확인
  const checkMatching = (flippedCards) => {
    const [firstCard, secondCard] = flippedCards;

    // 두 카드가 맞는지 확인
    if (firstCard.cardImg === secondCard.cardImg) {
      setTimeout(() => {
        const updatedCardDeck = [...cardDeck];
        updatedCardDeck[firstCard.index].isMatched = true;
        updatedCardDeck[secondCard.index].isMatched = true;
        setCardDeck(updatedCardDeck);
        setIsFlip(true); // 카드 뒤집기 가능 상태로 변경
        checkGameClear();
      }, 500);
    } else {
      // 두 카드가 틀린 경우
      setTimeout(() => {
        const updatedCardDeck = [...cardDeck];
        updatedCardDeck[firstCard.index].isFlipped = false;
        updatedCardDeck[secondCard.index].isFlipped = false;
        setCardDeck(updatedCardDeck);
        setIsFlip(true); // 카드 뒤집기 가능 상태로 변경
      }, 1000);
    }
  };

  // 게임 타이머 시작
  const startTimer = () => {
    setTimer(
      setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000),
    );
  };

  // 카드 섞기
  const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
  };

  // 카드 덱 생성
  const makeCardDeck = () => {
    // Code for creating and shuffling the card deck
  };

  // 난수 생성
  const getRandom = (max, min) => parseInt(Math.random() * (max - min) + min, 10);

  // 카드 화면에 세팅
  const settingCardDeck = () => {
    // Code for setting the card deck on the game board
  };

  // 전체 카드 보여주는 함수
  const showCardDeck = () => {
    // Code for showing all the cards in the deck
  };

  // 전체 카드 숨기는 함수
  const hideCardDeck = () => {
    // Code for hiding all the cards in the deck
  };

  // 두 개의 카드가 뒤집혔는지 확인
  const checkFlippedCards = () => {
    const flippedCards = cardDeck.filter((card) => card.isFlipped && !card.isMatched);
    if (flippedCards.length === 2) {
      setIsFlip(false); // 카드 뒤집기 불가능 상태로 변경
      checkMatching(flippedCards);
    }
  };

  // 스테이지 클리어
  const clearStage = () => {
    clearInterval(timer);

    if (stage <= 8) {
      setTime(60 - stage * 5);
    }
    setStage(stage + 1);
    setCardDeck([]);

    // Code for clearing the stage and starting the next stage
  };

  // 게임 시작
  const startGame = () => {
    initGame();
    initScreen();
    makeCardDeck();
    startTimer();
  };

  // 게임 재시작
  const restartGame = () => {
    initGame();
    initScreen();
    startGame();
  };

  // 게임 컴포넌트가 마운트될 때 게임 시작
  useEffect(() => {
    startGame();
  }, []);

  return (
    <div id="container" className="no-drag">
      <div className="board">
        <header className="menu">
          <nav className="menu__nav">
            <div className="menu__nav-time">
              <strong id="player-time" className="blink" aria-label="남은 시간" />
            </div>
            <div className="menu__nav-stage">
              STAGE
              <strong id="player-stage" aria-label="스테이지" />
            </div>
            <div className="menu__nav-home">
              <a href="./index.html#card-matching" className="menu__nav-home--button" id="home-button">
                <span className="sr-only">메인 페이지로 이동</span>
              </a>
            </div>
          </nav>
        </header>

        <main className="game">
          <div className="game__board" />
        </main>

        <div className="stage-clear" />
      </div>

      <div className="modal modal-layer">
        <div className="modal__content">
          <div className="modal__content-title" />

          <button className="white-button modal__content-close-button" type="button">
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
