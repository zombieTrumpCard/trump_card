import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const wordGame = () => {
  const locations = [
    "가",
    "나",
    "다",
    "라",
    "마",
    "바",
    "사",
    "아",
    "자",
    "차",
    "카",
    "타",
    "파",
    "하",
  ];

  const [currentLocation, setCurrentLocation] = useState("");
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [userInputs, setUserInputs] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [round, setRound] = useState(1);
  const [timer, setTimer] = useState(10);
  const conversationRef = useRef(null);
  const timerRef = useRef(null);

  const players = ["User1", "User2", "User3", "User4", "User5", "User6"];
  const roundLimit = 5;

  const startTimer = () => {
    clearInterval(timerRef.current);
    setTimer(10);

    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
  };

  const startGame = () => {
    const randomIndex = Math.floor(Math.random() * locations.length);
    const selectedLocation = locations[randomIndex];
    setCurrentLocation(selectedLocation);
    setCurrentPlayerIndex(0);
    setUserInputs([]);
    setConversations([]);
    setRound(1);
    startTimer();
  };

  const test = async (a) => {
    // console.log("담길값", a);
    try {
      const response = await axios.get("/api/search/encyc", {
        params: {
          word: a,
        },
      });
      console.log(response);
    } catch (error) {
      if (error.code !== 200 && error.code === 401) {
        alert(`${error.response.data.message}`);
      } else {
        alert(error);
      }
    }
  };

  useEffect(() => {
    test();
  }, []);

  const handleTimeout = () => {
    clearInterval(timerRef.current);
    alert("TIMEOUT");
    if (round < roundLimit) {
      setRound((prevRound) => prevRound + 1);
      setCurrentPlayerIndex(0);
      setUserInputs([]);
      setConversations([]);
      startTimer();
    } else {
      // 게임 종료 처리
      alert("게임이 종료되었습니다.");
      // 게임 종료 후 초기화를 수행합니다.
      setCurrentLocation("");
      setRound(1);
      setCurrentPlayerIndex(0);
      setUserInputs([]);
      setConversations([]);
    }
  };

  const handleUserInput = (e, index) => {
    const value = e.target.value.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣]/g, "");
    setUserInputs((prevInputs) => {
      const newInputs = [...prevInputs];
      newInputs[index] = value;
      return newInputs;
    });
  };

  const checkAnswer = (userInput, index) => {
    const regexPattern = /^[ㄱ-ㅎ가-힣]+$/;
    if (
      (conversations.length === 0 && userInput.charAt(0) === currentLocation) ||
      (conversations.length > 0 &&
        userInput.charAt(0) ===
          conversations[conversations.length - 1].slice(-1))
    ) {
      if (regexPattern.test(userInput)) {
        setConversations((prevConversations) => {
          const newConversations = [...prevConversations];
          test(userInput);
          // console.log(userInput);
          newConversations.push(`${players[index]}: ${userInput}`);
          return newConversations;
        });
        setUserInputs((prevInputs) => {
          const newInputs = [...prevInputs];
          newInputs[index] = "";
          return newInputs;
        });
        setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
        clearInterval(timerRef.current);
        startTimer();
      } else {
        alert("잘못된 입력입니다. 자음 또는 모음으로만 입력해주세요!");
        setUserInputs((prevInputs) => {
          const newInputs = [...prevInputs];
          newInputs[index] = "";
          return newInputs;
        });
      }
    } else {
      alert("실패!");
      setUserInputs((prevInputs) => {
        const newInputs = [...prevInputs];
        newInputs[index] = "";
        return newInputs;
      });
    }
  };

  const submitUserInput = (e, index) => {
    e.preventDefault();
    const userInput = userInputs[index];
    if (userInput) {
      checkAnswer(userInput, index);
    }
  };

  useEffect(() => {
    conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
  }, [conversations]);

  useEffect(() => {
    if (timer === 0) {
      handleTimeout();
    }
  }, [timer]);

  useEffect(() => {
    if (round === roundLimit) {
      // 마지막 라운드일 경우 게임 종료 처리
      // 예: 결과 출력, 리셋 등
    }
  }, [round]);

  return (
    <div className="game-container">
      <h1>끝말잇기 게임</h1>
      <button onClick={startGame}>게임 시작</button>
      {currentLocation && <p>처음 제시어: {currentLocation}</p>}

      <div className="round-info">
        <p>남은 라운드: {roundLimit - round + 1}</p>
      </div>

      <div className="timer">
        <p>남은 시간: {timer}초</p>
      </div>

      <div className="conversation-box" ref={conversationRef}>
        <h2>게임 창</h2>
        <div className="conversation-content">
          {conversations.map((conversation, index) => (
            <p key={index}>{conversation}</p>
          ))}
        </div>
      </div>

      <div className="user-inputs">
        {players.map((player, index) => (
          <form key={index} onSubmit={(e) => submitUserInput(e, index)}>
            <label>{player}</label>
            <input
              type="text"
              value={userInputs[index] || ""}
              onChange={(e) => handleUserInput(e, index)}
              pattern="^[ㄱ-ㅎ가-힣]+$"
              title="잘못된 입력입니다. 자음 또는 모음으로만 입력해주세요!"
              required
            />
            <button type="submit" disabled={currentPlayerIndex !== index}>
              입력
            </button>
          </form>
        ))}
      </div>
    </div>
  );
};

export default wordGame;
