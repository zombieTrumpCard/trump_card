import axios from "axios";
import React, { useEffect, useState } from "react";
import skinList from "../skin.json";

export default function Store() {
  const [skinArr, setSkinArr] = useState([]);
  const [mySkinArr, setMykinArr] = useState([]);
  const [point, setPoint] = useState();

  const getSkinArr = async () => {
    try {
      const response = await axios.get("/skins/ckskin");
      console.log(response.data);

      const filteredArray = response.data.filter(
        (item) => item.skin !== "nomal"
      );
      // 데이터 담기
      setSkinArr(filteredArray);
    } catch (error) {
      console.log(error);
    }
  };

  const getMyskin = async () => {
    try {
      const response = await axios.get("/userSkins/ckSkin");
      // console.log("response.data GETMYSKIN", response.data);

      // 데이터 담기
      setMykinArr(response.data); // 내스킨목록
      console.log("response.data 내스킨목록", mySkinArr);
    } catch (error) {
      alert(error);
    }
  };

  const getMyPoint = async () => {
    try {
      const response = await axios.get("/userInfos/myInfo");
      console.log(response.data);

      // 데이터 담기
      setPoint(response.data.userInfo.point);
    } catch (error) {
      console.log(error);
    }
  };

  const buySkin = async (skin_id) => {
    try {
      const response = await axios.post("/userSkins/buySkin", { skin_id });
      console.log("response.data 구매", response.data);

      // 포인트와 구매한 스킨을 불러온다.
      getMyPoint();
      getMyskin();
      alert("스킨을 구매하였습니다.");
    } catch (error) {
      console.log(error);
    }
  };

  const verifyBuying = (skin_id, price, e) => {
    // console.log("구매완료버튼누름", e.target.className);
    if (e.target.className === "buy-btn soldOut") {
      e.preventDefault();
      console.log("구매완료버튼누름", e.target.className);
      return;
    }
    if (point < price) {
      alert("포인트가 부족합니다.");
    } else if (point >= price) {
      buySkin(skin_id);
    }
  };

  useEffect(() => {
    getSkinArr();
  }, []);

  useEffect(() => {
    getMyPoint();
    getMyskin();
  }, [point]);

  return (
    <div className="store">
      <div className="box-whole">
        <div className="box-content-top">
          <p>상점</p>
          <div className="navbar">
            <span>보유 포인트</span>
            <span className="myPoint">{point}G</span>
          </div>
        </div>
        <div className="box-content-bottom">
          <div className="shop-owner" />
          <div className="shelf">
            {skinArr.length > 0 ? (
              skinArr.map((item, index) => (
                <div className="skin-box" key={index}>
                  <button
                    className={`buy-btn ${
                      mySkinArr.some((one) => one.skin_id === item.skin_id)
                        ? "soldOut"
                        : ""
                    }`}
                    type="button"
                    onClick={(e) => {
                      verifyBuying(item.skin_id, item.price, e);
                    }}
                  >
                    {mySkinArr.some((one) => one.skin_id === item.skin_id)
                      ? "구매완료"
                      : "구매"}
                  </button>
                  <div className={`skin-img ${item.skin}`} />
                  <span className="skin-name">
                    {skinList.find((one) => one.skin_id === item.skin_id)
                      ? skinList.find((one) => one.skin_id === item.skin_id)
                          .skin_name
                      : "데이터없음"}
                  </span>
                  <span className="skin-price">{item.price} G</span>
                </div>
              ))
            ) : (
              <p>스킨 목록을 불러오지 못했습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
