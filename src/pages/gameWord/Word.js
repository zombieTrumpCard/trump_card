import PropTypes from "prop-types";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import socket from "../../util/socket";
import isLogin from "../../util/isLogin";

export default function Word({ myNickname, roomName }) {
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
  const [sugggetWords, setSugggetWords] = useState([]);
  const [arrayWords, setArrayWords] = useState([]);
  const [notification, setNotification] = useState("");

  const players = ["User1", "User2", "User3", "User4", "User5", "User6"];
  const roundLimit = 5;

  // 유저 리스트
  const [playerList, setPlayerList] = useState([]);

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
    setNotification("");
  }

  function handleGameStartButton() {
    const randomWords = [];
    while (randomWords.length < 5) {
      const randomIndex = Math.floor(Math.random() * locations.length);
      const word = locations[randomIndex];
      if (!randomWords.includes(word)) {
        randomWords.push(word);
      }
    }

    // 첫 번째 인덱스의 글자를 맨 처음 제시어로 설정
    const initialLocation = randomWords[0];
    console.log(randomWords);
    setSugggetWords(randomWords);
    setCurrentLocation(initialLocation); // 맨 처음 제시어 설정

    socket.start({
      room: roomName,
      words: randomWords,
    });
  }
  // 버튼 클릭 이벤트 핸들러
  const handleClickStartButton = () => {
    handleGameStartButton();
  };

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
        setNotification(`${error.response.data.message}`);
        // 알림 보내기
        socket.sendNoti({
          room: roomName,
          noti: notification,
        });
        console.log("1", notification);
      } else {
        setNotification(error);
        // 알림 보내기
        socket.sendNoti({
          room: roomName,
          noti: notification,
        });
      }
      return false; // 유효성 검사 실패로 처리
    }
  };

  // 방 유저 퇴장 DB에서 삭제
  const leaveRoom = async () => {
    try {
      const response = await axios.delete("/word/leaveRoom");
      console.log(response.data.message);
    } catch (error) {
      console.log("leaveRoom error : ", error);
    }
  };

  // 방장이 나가면 방을 DB에서 삭제
  const deleteRoom = async () => {
    try {
      const response = await axios.delete("/word/deleteRoom");
      console.log(response.data.message);
    } catch (error) {
      console.log("deleteRoom error : ", error);
    }
  };

  useEffect(() => {
    const checkOwner = async () => {
      try {
        const response = await axios.get("/word/verification");
        const result = response.data;
        // console.log(result);
        // 게임시작
        if (result === true) {
          setIsRoomOwner(true);
        } else {
          setNotification("방장이 아닙니다!");
          // 알림 보내기
          socket.sendNoti({
            room: roomName,
            noti: notification,
          });
        }
      } catch (error) {
        throw new Error(error);
      }
    };
    isLogin();
    test();
    checkOwner();

    console.log("몇번출력되나두고보자");

    // 메세지 수신 설정
    socket.receiveMsg(setConversations);

    // admin 메시지 수신 이벤트
    socket.receiveAminMsg(setAdminMsg);

    // 게임 받기 이벤트
    socket.receiveStartMsg(
      initializeGame,
      setArrayWords,
      setCurrentLocation,
      setRound,
      setCurrentPlayerIndex,
      setUserInputs,
      setConversations
    );
    // 타이핑 메세지 수신
    socket.receiveTypingMsg(setTypingMsg);

    // 유저 리스트 수신
    socket.getplayerList(setPlayerList);

    // 알림 받기
    socket.listenNoti(setNotification);

    // 컴포넌트가 언마운트 될 때 방 퇴장
    return () => {
      socket.leaveRoom({
        userNick: myNickname,
        room: roomName,
      });
      leaveRoom();
      deleteRoom();
    };
  }, []);
  useEffect(() => {
    // 현재 참여중인 유저가 업데이트 되면 처리할 내용을 아래에 작성
    // console.log("playerList", playerList);
  }, [playerList]);

  const handleTimeout = () => {
    clearInterval(timerRef.current);
    setNotification("TIMEOUT");
    // 알림 보내기
    socket.sendNoti({
      room: roomName,
      noti: notification,
    });
    if (round < roundLimit) {
      setRound((prevRound) => prevRound + 1);

      // 다음 인덱스의 글자를 보여줌
      const nextIndex = (currentPlayerIndex + 1) % players.length;
      const nextLocation = sugggetWords[nextIndex];
      setCurrentLocation(nextLocation);

      setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
      setUserInputs([]);
      setConversations([]);
      startTimer();
      
      socket.sendNextStep({
        roomName,
        word: nextLocation,
        index: currentPlayerIndex,
        suggest: sugggetWords,
        player: players,
        round: roundLimit,
      }); // 다음 스텝 보내기 이벤트 전송
      socket.listenNextStep();
    } else {
      // 게임 종료 처리
      setNotification("게임이 종료되었습니다.");
      // 알림 보내기
      socket.sendNoti({
        room: roomName,
        noti: notification,
      });
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
          console.log(userInput, myNickname, conversations);

          if (userInput.length < 2) {
            setNotification("2글자 이상 입력해주세요!");
            // 알림 보내기
            socket.sendNoti({
              room: roomName,
              noti: notification,
            });
            setUserInputs((prevInputs) => {
              const newInputs = [...prevInputs];
              newInputs[index] = "";
              return newInputs;
            });
            return;
          }

          let isDuplicate = false;
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < conversations.length; i++) {
            if (conversations[i].split(": ")[1] === userInput) {
              isDuplicate = true;
              break;
            }
          }

          if (isDuplicate) {
            setNotification("중복된 단어입니다. 다른 단어를 입력해주세요!");
            // 알림 보내기
            socket.sendNoti({
              room: roomName,
              noti: notification,
            });
            setUserInputs((prevInputs) => {
              const newInputs = [...prevInputs];
              newInputs[index] = "";
              return newInputs;
            });
            return;
          }

          socket.sendMsg({
            message: userInput,
            sender: myNickname,
            room: roomName,
          });

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
          setNotification(
            "유효하지 않은 입력입니다. 다른 단어를 시도해주세요!"
          );
          // 알림 보내기
          socket.sendNoti({
            room: roomName,
            noti: notification,
          });
          setUserInputs((prevInputs) => {
            const newInputs = [...prevInputs];
            newInputs[index] = "";
            return newInputs;
          });
        }
      } else {
        setNotification(
          "잘못된 입력입니다. 자음 또는 모음으로만 입력해주세요!"
        );
        // 알림 보내기
        socket.sendNoti({
          room: roomName,
          noti: notification,
        });
        setUserInputs((prevInputs) => {
          const newInputs = [...prevInputs];
          newInputs[index] = "";
          return newInputs;
        });
      }
    } else {
      setNotification("실패!");
      // 알림 보내기
      socket.sendNoti({
        room: roomName,
        noti: notification,
      });
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
        <p>.. {typingMsg}</p>
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
        {notification && <div className="resultBox">{notification}</div>}{" "}
      </div>
      <div className="conversation-box" ref={conversationRef}>
        <button onClick={handleClickStartButton} disabled={!isRoomOwner}>
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
};
