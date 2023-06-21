import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Rank() {
  const [activeLevel, setActiveLevel] = useState("Hard");
  const [myscore, setMyscore] = useState("");
  const [data, setData] = useState([
    {
      userScores: {
        tier: "다이아",
        nickname: "태황무임중",
      },
      score: "10000000000",
      date: "2023.03.12",
    },
    {
      userScores: {
        tier: "플래티넘",
        nickname: "벚꽃놀이",
      },
      score: "5000000",
      date: "2023.03.12",
    },
    {
      userScores: {
        tier: "골드",
        nickname: "가라아게",
      },
      score: "40000",
      date: "2023.03.12",
    },
    {
      userScores: {
        tier: "골드",
        nickname: "가라아게",
      },
      score: "40000",
      date: "2023.03.12",
    },
    {
      userScores: {
        tier: "골드",
        nickname: "가라아게",
      },
      score: "40000",
      date: "2023.03.12",
    },
    {
      userScores: {
        tier: "골드",
        nickname: "가라아게",
      },
      score: "40000",
      date: "2023.03.12",
    },
    {
      userScores: {
        tier: "실버",
        nickname: "빠삐코",
      },
      score: "3000",
      date: "2023.03.12",
    },
    {
      userScores: {
        tier: "브론즈",
        nickname: "강남",
      },
      score: "2000",
      date: "2023.03.12",
    },
  ]);

  const dateParser = (string) => {
    const dateString = string;
    const date = new Date(dateString);

    // 날짜 부분 추출
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    // 시간 부분 추출
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // 포맷된 날짜 및 시간 출력
    const formattedDate = `${month}월 ${day}일 ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  };

  const getData = async (level) => {
    try {
      const response = await axios.get("/userScores/ckscoreBefore", {
        params: {
          level,
        },
      });
      // console.log(response.status);
      console.log(response.data); // 로그인 성공 시 받아온 데이터 처리

      // 데이터 셋
      setData(response.data);
    } catch (error) {
      console.error(error); // 에러 처리
      alert(error);
    }
  };

  const myscoreGet = async (level) => {
    try {
      const response = await axios.get("/userScores/cbScore", {
        params: {
          level,
        },
      });
      console.log(response.status);
      console.log(response.data); // 로그인 성공 시 받아온 데이터 처리
      setMyscore(response.data); // 내 스코어
    } catch (error) {
      console.error(error); // 에러 처리
      if (error.code !== 200 && error.code === 401) {
        alert(`${error.response.data.message}`);
      } else {
        alert(error);
      }
    }
  };

  const handleButtonClick = (e) => {
    const buttonId = e.target.id; // 클릭된 버튼의 ID 값 가져오기
    console.log(`누른 버튼 아이디는 ${buttonId}`);
    setActiveLevel(buttonId);
    getData(buttonId);
  };

  // 최초 1회 호출
  useEffect(() => {
    getData("Hard");
    // myscoreGet();
  }, []);

  return (
    <div className="rank">
      <div className="box-whole">
        <h1>랭킹</h1>
        {/* <p>내 스코어 : {myscore}</p>
        <button type="button" onClick={() => myscoreGet(activeLevel)}>
          가져오기
        </button> */}
        <div className="body-content">
          <div className="navbar">
            <div className="lv-bar">
              <span className="lv">난이도</span>
              <button
                className={activeLevel === "Hard" ? "lv-btn active" : "lv-btn"}
                type="button"
                id="Hard"
                onClick={handleButtonClick}
              >
                어려움
              </button>
              <button
                className={
                  activeLevel === "Normal" ? "lv-btn active" : "lv-btn"
                }
                type="button"
                id="Normal"
                onClick={handleButtonClick}
              >
                보통
              </button>
              <button
                className={activeLevel === "Easy" ? "lv-btn active" : "lv-btn"}
                type="button"
                id="Easy"
                onClick={handleButtonClick}
              >
                쉬움
              </button>
            </div>
          </div>
          <div className="table-box">
            <table className="table-container">
              <thead>
                <tr>
                  <th>순위</th>
                  <th>티어</th>
                  <th>닉네임</th>
                  <th>점수</th>
                  <th>갱신일</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <tr key={index} className={`row${index + 1}`}>
                      <td>{index + 1}</td>
                      <td
                        className={
                          item["UserInfo.tier"] === "다이아"
                            ? "rainbow-text-loop"
                            : ""
                        }
                      >
                        {item["UserInfo.tier"]}
                      </td>
                      <td>{item["UserInfo.nickname"]}</td>
                      <td>
                        {item.score
                          ? Number(item.score).toLocaleString()
                          : "null"}
                      </td>
                      <td>{dateParser(item.date)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>데이터가 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
