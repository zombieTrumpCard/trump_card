import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import skinList from "../skin.json";

export default function Mypage() {
  const [showModal, setShowModal] = useState(false); // 모달
  const [nickname, setNickname] = useState("닉네임명");
  const [skinId, setSkinId] = useState(426);
  const [skinname, setSkinname] = useState("스킨명");
  const [tier, setTier] = useState("티어명");
  const [score, setScore] = useState(426);
  const [point, setPoint] = useState(426);
  const [ckSkin, setCkSkin] = useState("");
  const [myskinArr, setMykinArr] = useState([
    {
      skin_id: 1,
      skin: "스킨1",
    },
    {
      skin_id: 2,
      skin: "스킨2",
    },
    {
      skin_id: 3,
      skin: "스킨3",
    },
    {
      skin_id: 4,
      skin: "스킨4",
    },
  ]);

  // 모달 열기
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const getData = async () => {
    try {
      const response = await axios.get("/userInfos/myInfo");
      console.log("response.data", response.data);

      // 데이터 담기
      setNickname(response.data.userInfo.nickname); // 닉네임
      setSkinId(
        response.data.userSkin.skin_id === null
          ? "11"
          : response.data.userSkin.skin_id
      ); // 스킨아이디
      // setSkinname(response.data.skinName ? response.data.skinName : "default"); // 스킨명
      setTier(response.data.userInfo.tier); // 티어
      setScore(
        response.data.userScores[0].score
          ? response.data.userScores[0].score
          : ""
      ); // 스코어
      setPoint(response.data.userInfo.point); // 포인트

      setSkinname(
        skinList.map((item) => {
          if (
            item.skin ===
            (response.data.userSkin.skin_skinName === null
              ? "default"
              : response.data.userSkin.skin_skinName)
          ) {
            return item.skin_name;
          }
          // 찾지 못한다면
          return null;
        })
      );
    } catch (error) {
      // alert(error);
      if(error === null){
        console.log("null을 디폴트로 처리")
      }
    }
  };

  const handleLevelChange = async (e) => {
    const selectedLevel = e.target.value;
    const level = selectedLevel;
    console.log(level);
    try {
      const response = await axios.get("/userScores/cbScore");
      console.log(response.data);

      // 데이터 담기
      setScore(response.data); // 스코어
    } catch (error) {
      // alert(error);
      console.log(error);
    }
  };

  const getMyskin = async () => {
    try {
      const response = await axios.get("/userSkins/ckSkin");
      console.log(response.data);

      // 데이터 담기
      setMykinArr(response.data); // 내스킨목록
    } catch (error) {
      alert(error);
    }
  };

  const setMyskin = async (e) => {
    console.log("req ckSkin : ", ckSkin);
    const skin_id = ckSkin;
    try {
      const response = await axios.put("/userSkins/updateSkin", { skin_id });
      console.log(response.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   // console.log(ckSkin);
  //   // console.log(skinList);
  // }, [ckSkin, nickname, skinname, tier, score, point, myskinArr]);

  return (
    <div className="mypage">
      <div className="box-whole">
        <div className="box-content">
          <p className="myname">
            {nickname}
            님!
          </p>
          <div className="navbar">
            <Link to="/nickChange" className="nav-btn">
              닉네임 변경
            </Link>
            <Link to="/dropUser" className="nav-btn" type="button">
              회원 탈퇴
            </Link>
          </div>
        </div>
        <div className="body-content">
          <p className="mykey">현재 적용 중인 스킨</p>
          <p className="myvalue">{skinname}</p>
          <div
            className="skinimg-container"
            onClick={() => {
              handleOpenModal();
              getMyskin();
            }}
          >
            <div className="skinimg-back">&#187;</div>
            <div className="skinimg-front">카드 앞</div>
          </div>
          <div className="keyvalue-box">
            <span className="mykey">현재 티어</span>
            <span className="myvalue">{tier}</span>
          </div>
          <div className="keyvalue-box">
            <span className="mykey">최고 점수</span>
            <span className="myvalue">{score}점</span>
            <select id="levels" onChange={handleLevelChange}>
              <option value="hard">어려움</option>
              <option value="normal">보통</option>
              <option value="easy">쉬움</option>
            </select>
          </div>
          <div className="keyvalue-box">
            <span className="mykey">보유 포인트</span>
            <span className="myvalue">{point}G</span>
          </div>
        </div>
        {/* The Modal */}
        {showModal && (
          <div id="myModal" className="modal">
            {/* Modal content */}
            <div className="modal-content">
              <button
                className="close"
                onClick={handleCloseModal}
                type="button"
              >
                &times;
              </button>
              <p>스킨 변경하기</p>
              <div className="shelf">
                {myskinArr.length > 0 ? (
                  myskinArr.map((item, index) => (
                    <div className="skin-box" key={index}>
                      <span>{item.skin_id}</span>
                      <div
                        className={
                          item.skin_id === ckSkin
                            ? "skin-img checked"
                            : "skin-img"
                        }
                        onClick={() => {
                          setCkSkin(item.skin_id);
                        }}
                      />
                      <span className="skin-name">{item.skin}</span>
                    </div>
                  ))
                ) : (
                  <p>스킨 목록을 불러오지 못했습니다.</p>
                )}
              </div>
              <button type="button" onClick={setMyskin}>
                변경하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
