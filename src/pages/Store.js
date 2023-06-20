import axios from "axios";
import React, { useEffect, useState } from "react";
import skinList from "../skin.json";

export default function Store() {
  const [skinArr, setSkinArr] = useState([]);

  const getSkinArr = async () => {
    try {
      const response = await axios.get("/skins/ckskin");
      console.log(response.data);

      // 데이터 담기
      setSkinArr(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const buySkin = async (skin_id) => {
    try {
      const response = await axios.post("/userSkins/buySkin", { skin_id });
      console.log("response.data 구매", response.data);
      alert("스킨을 구매하였습니다.")
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSkinArr();
  }, []);

  return (
    <div className="store">
      <div className="box-whole">
        <div className="box-content-top">
          <p>상점</p>
          <div className="navbar">
            <span>보유 포인트 :</span>
            <span className="myPoint">3000G</span>
          </div>
        </div>
        <div className="box-content-bottom">
          <div className="shop-owner" />
          <div className="shelf">
            {skinArr.length > 0 ? (
              skinArr.map((item, index) => (
                <div className="skin-box" key={index}>
                  <button
                    className="buy-btn"
                    type="button"
                    onClick={() => {
                      buySkin(item.skin_id);
                    }}
                  >
                    구매
                  </button>
                  <div className={`skin-img ${item.skin}`} />
                  <span className="skin-name">{item.skin}</span>
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
