import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import skinList from "../../skin.json";

export default function Mypage() {
  const [showModal, setShowModal] = useState(false); // 모달
  const [userInfo, setUserInfo] = useState({
    nickname: "닉네임명",
    skinNameEN: "skinName",
    skinNameKO: "스킨명",
    tier: "티어명",
    score: 0,
    point: 0,
  });
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
    setCkSkin("");
    setShowModal(false);
  };

  const getData = async () => {
    try {
      const response = await axios.get("/userInfos/myInfo");
      const {
        userSkin,
        userInfo: { nickname, tier, point },
        userScores,
        skinName,
      } = response.data;

      const skin_id = userSkin?.skin_id || 11;
      const score = userScores[0]?.score || 0;
      const skinNameEN = skinName || "nomal";
      const skinNameKO =
        skinList.find((item) => item.skin === skinNameEN)?.skin_name || null;

      setUserInfo({
        nickname,
        skinNameEN,
        skinNameKO,
        tier: tier || "기록 없음",
        score,
        point,
      });

      // // 데이터 담기
      // setNickname(response.data.userInfo.nickname); // 닉네임
      // setSkinId(response.data.userSkin?.skin_id || 11); // 스킨아이디
      // // setSkinname(response.data.skinName ? response.data.skinName : "nomal"); // 스킨명
      // setTier(response.data.userInfo.tier || "기록 없음"); // 티어
      // setScore(response.data.userScores[0]?.score || 0); // 스코어

      // setPoint(response.data.userInfo.point); // 포인트

      // setSkinNameEN(response.data?.skinName || "nomal");

      // // 스킨 이름 세팅
      // const getSkinName = skinList.find(
      //   (item) => item.skin === (response.data.skinName || "nomal")
      // );
      // setSkinNameKO(getSkinName ? getSkinName.skin_name : null);
    } catch (error) {
      alert(error);
      if (error === null) {
        console.log("null을 디폴트로 처리");
      }
    }
  };

  const handleLevelChange = async (e) => {
    const selectedLevel = e.target.value;
    const level = selectedLevel;
    console.log(level);
    try {
      const response = await axios.get("/userScores/cbScore", {
        params: {
          level,
        },
      });
      console.log("response.data 스코어 불러오기", response.data);

      // 데이터 담기
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        score: response.data,
      }));
    } catch (error) {
      // alert(error);
      if (error.code !== 200) {
        console.log(`${error.response.data.message}`);
        if (error.response.data.message === "해당 난이도 점수가 없습니다!") {
          setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            score: 0,
          }));
        }
      } else {
        alert(error);
      }
    }
  };

  const getMyskin = async () => {
    try {
      const response = await axios.get("/userSkins/ckSkin");
      console.log("response.data GETMYSKIN", response.data);

      // 데이터 담기
      if (response.data.length > 0) {
        setMykinArr(response.data); // 내스킨목록
      } else if (response.data.length === 0) {
        setMykinArr([
          {
            skin_id: 11,
          },
        ]);
      }
    } catch (error) {
      alert(error);
    }
  };

  const setMyskin = async () => {
    console.log("req ckSkin : ", ckSkin);
    const skin_id = ckSkin;
    try {
      const response = await axios.put("/userSkins/updateSkin", { skin_id });
      console.log(response.data);
      handleCloseModal();
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getData();
  }, [showModal]);

  return (
    <div className="mypage">
      <div className="box-whole">
        <div className="box-content">
          <p className="myname">
            {userInfo.nickname}
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
          <p className="mykey myskin">현재 적용 중인 스킨</p>
          <p className="myvalue myskin">{userInfo.skinNameKO}</p>
          <div
            className="skinimg-container"
            onClick={() => {
              handleOpenModal();
              getMyskin();
            }}
          >
            <div className="skinimg-back">&#187;</div>
            <div className={`skinimg-front ${userInfo.skinNameEN}`}></div>
          </div>
          <div className="keyvalue-box">
            <span className="mykey">현재 티어</span>
            <span className="myvalue">{userInfo.tier}</span>
          </div>
          <div className="keyvalue-box">
            <span className="mykey">최고 점수</span>
            <span className="myvalue">
              {userInfo.score === 0 ? "기록 없음" : `${userInfo.score} 점`}
            </span>
            <select id="levels" onChange={handleLevelChange}>
              <option value="Hard">어려움</option>
              <option value="Normal">보통</option>
              <option value="Easy">쉬움</option>
            </select>
          </div>
          <div className="keyvalue-box">
            <span className="mykey">보유 포인트</span>
            <span className="myvalue">{userInfo.point}G</span>
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
              <div className="box-xscroll">
                <div className="shelf">
                  {myskinArr.length > 0 ? (
                    myskinArr.map((item, index) => (
                      <div className="skin-box" key={index}>
                        <span className="skin-name">
                          {skinList.find((one) => one.skin_id === item.skin_id)
                            ?.skin_name || "nomal"}
                        </span>
                        <div
                          className={`skin-img ${
                            item.skin_id === ckSkin ? "checked" : ""
                          } ${
                            skinList.find((one) => one.skin_id === item.skin_id)
                              ? `${
                                  skinList.find(
                                    (one) => one.skin_id === item.skin_id
                                  ).skin
                                }`
                              : "nomal"
                          }`}
                          onClick={() => {
                            setCkSkin(item.skin_id);
                          }}
                        />
                      </div>
                    ))
                  ) : (
                    <p>스킨 목록을 불러오지 못했습니다.</p>
                  )}
                </div>
                <button
                  className="setMyskin-btn"
                  type="button"
                  onClick={setMyskin}
                >
                  변경하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
