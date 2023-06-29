import PropTypes from "prop-types";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import socket from "../../util/socket";
import isLogin from "../../util/isLogin";

export default function Word({ myNickname, roomName, userList }) {
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
  const [time, setTime] = useState(10);
  const [rabbitPosition, setRabbitPosition] = useState(0);
  const [isRoomOwner, setIsRoomOwner] = useState(false);
  const boxWidth = 300; // 박스의 너비
  const conversationRef = useRef(null);
  const timerRef = useRef(null);
  const [adminMsg, setAdminMsg] = useState([]);
  const [typingMsg, setTypingMsg] = useState([]);

  const players = ["User1", "User2", "User3", "User4", "User5", "User6"];
  const roundLimit = 5;

  // 유저 리스트
  const [playerList, setPlayerList] = useState(userList);

  const startTimer = () => {
    clearInterval(timerRef.current);
    setTimer(10);

    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
  };

  function initializeGame() {
    const randomIndex = Math.floor(Math.random() * locations.length);
    const selectedLocation = locations[randomIndex];
    setCurrentLocation(selectedLocation);
    setCurrentPlayerIndex(0);
    setUserInputs([]);
    setConversations([]);
    setRound(1);
    startTimer();
  }

  const test = async (a) => {
    try {
      const response = await axios.get("/api/search/encyc", {
        params: {
          word: a,
        },
      });

      const isValid = response.data; // 가정: 응답에서 유효성 검사 결과를 추출하여 사용

      return isValid; // 유효성 검사 결과 반환
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert(`${error.response.data.message}`);
      } else {
        alert(error);
      }
      return false; // 유효성 검사 실패로 처리
    }
  };

  useEffect(() => {
    const checkOwner = async () => {
      try {
        const response = await axios.get("/word/verification");
        const result = response.data;
        // 게임시작
        if (result === true) {
          setIsRoomOwner(true);

          socket.start({
            room: roomName,
          });
        } else {
          alert("방장이 아닙니다!");
        }
      } catch (error) {
        throw new Error(error);
      }
    };
    isLogin();
    test();
    checkOwner();
    socket.sendStartMsg(initializeGame);

    console.log("몇번출력되나두고보자");

    // 메세지 수신 설정
    socket.receiveMsg(setConversations);

    // admin 메시지 수신 이벤트
    socket.receiveAminMsg(setAdminMsg);

    // 타이핑 메세지 수신
    socket.receiveTypingMsg(setTypingMsg);
  }, []);

  const handleTimeout = () => {
    clearInterval(timerRef.current);
    alert("TIMEOUT");
    if (round < roundLimit) {
      setRound((prevRound) => prevRound + 1);
      setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
      setUserInputs([]);
      setConversations([]);
      startTimer();

      // 처음 제시어를 다시 랜덤으로 선택
      const randomIndex = Math.floor(Math.random() * locations.length);
      const selectedLocation = locations[randomIndex];
      setCurrentLocation(selectedLocation);
    } else {
      // 게임 종료 처리
      alert("게임이 종료되었습니다.");
      // 게임 종료 후 초기화를 수행합니다.
      setCurrentLocation("");
      setRound(1);
      setCurrentPlayerIndex(players.indexOf(players[currentPlayerIndex]) + 1);
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

  const checkAnswer = async (userInput, index) => {
    const regexPattern = /^[ㄱ-ㅎ가-힣]+$/;
    if (
      (conversations.length === 0 && userInput.charAt(0) === currentLocation) ||
      (conversations.length > 0 &&
        userInput.charAt(0) ===
          conversations[conversations.length - 1].slice(-1))
    ) {
      if (regexPattern.test(userInput)) {
        const isValid = await test(userInput);

        if (isValid === true) {
          // setConversations((prevConversations) => {
          //   const newConversations = [...prevConversations];
          //   // newConversations.push(`${players[index]}: ${userInput}`);
          //   // console.log(newConversations);
          //   return newConversations;
          // });
          console.log(userInput, myNickname, conversations);
          // const splitWord = conversations.map(
          //   (conversation) => conversation.split(": ")[1]
          // );
          // console.log(splitWord);

          socket.sendMsg({
            message: userInput,
            sender: myNickname,
            room: roomName,
          });
          // socket.receiveMsg(setConversations);
          // socketio.on("message", (data) => {
          //   const { sender, message, sendRoom } = data;
          //   console.log("데이터on시점", data);
          //   // setConversations((prevdata) => [...prevdata, `${sender}:${message}`]);
          //   setConversations((prevConversations) => {
          //     const newConversations = [...prevConversations];
          //     newConversations.push(`${sender}: ${message}`);
          //     console.log(98772, data);
          //     console.log(12321, newConversations);
          //     return newConversations;
          //   });
          // });
          setUserInputs((prevInputs) => {
            const newInputs = [...prevInputs];
            newInputs[index] = "";
            return newInputs;
          });
          setCurrentPlayerIndex(
            (prevIndex) => (prevIndex + 1) % players.length
          );
          clearInterval(timerRef.current);
          startTimer();
        } else {
          alert("유효하지 않은 입력입니다. 다른 단어를 시도해주세요!");
          setUserInputs((prevInputs) => {
            const newInputs = [...prevInputs];
            newInputs[index] = "";
            return newInputs;
          });
        }
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

  const handleTypingSend = (e) => {
    socket.sendTypingMsg({
      message: e.target.value,
      sender: myNickname,
      room: roomName,
    });
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

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTimer) => {
        if (prevTimer === 0) {
          setRabbitPosition(0); // 토끼 위치를 0으로 설정하여 다시 시작
          return 10; // 타이머를 10으로 설정하여 다시 시작
        }

        setRabbitPosition((prevPosition) => {
          if (prevPosition >= boxWidth) {
            return 0; // 토끼 위치를 0으로 설정하여 다시 시작
          }
          return prevPosition + boxWidth / 10; // 토끼 위치를 이동
        });

        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="game-container">
      <h1>끝말잇기 게임</h1>

      <div className="round-info">
        <p>남은 라운드: {roundLimit - round + 1}</p>
      </div>

      <div className="timer">
        <p>남은 시간: {timer}초</p>
        <p>{typingMsg}1</p>
      </div>

      <div className="bar">
        {rabbitPosition < boxWidth && (
          <div
            className="rabbit"
            style={{
              transform: `translateX(${rabbitPosition}px)`,
              transition: `${time}s linear`,
            }}
          ></div>
        )}
        <div className="clock"></div>
      </div>

      <div className="conversation-box" ref={conversationRef}>
        <button onClick={initializeGame} disabled={!isRoomOwner}>
          게임 시작
        </button>
        <h2>게임 창</h2>
        {adminMsg.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
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
              onChange={(e) => {
                handleUserInput(e, index);
                handleTypingSend(e);
              }}
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
      {currentLocation && (
        <p className="first">처음 제시어: {currentLocation}</p>
      )}
    </div>
  );
}

Word.propTypes = {
  myNickname: PropTypes.string.isRequired,
  roomName: PropTypes.string.isRequired,
  userList: PropTypes.array.isRequired,
};
