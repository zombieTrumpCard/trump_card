import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Store() {
  const [skinArr, setSkinArr] =useState([]);

  const getSkinArr = async () => {
    try {
      const response = await axios.get('/skins/ckskin'); 
      console.log(response.data); 

      // 데이터 담기
      setSkinArr(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const buySkin = async (skin_id) => {
    try {
      const response = await axios.post('/userSkins/buySkin', {skin_id}); 
      console.log(response.data); 

      // 데이터 담기
      setSkinArr(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() =>{
    getSkinArr();
  },[]);

  return (
    <div className="store">
      <div className="box-content">
        <p className="myname">상점</p>
        <div className="navbar">
          <span>보유 포인트 :</span>
          <span>3000G</span>
        </div>
      </div>
      <div className="body-content">
        <div className="shop-owner" />
        <div className="shelf">
          {skinArr.length > 0 ? (skinArr.map((item, index)=>(<div className="skin" key={index}>
            <button className="buy-btn" type="button" onClick={
              ()=>{buySkin(item.skin_id)}}>
              구매 {item.skin_id}
            </button>
            <div className="skin-img" />
            <span className="skin-name">{item.skin}</span>
            <span className="skin-price">{item.price} G</span>
          </div>))) : 
          (<p>스킨 목록을 불러오지 못했습니다.</p>)}
        </div>
      </div>
    </div>
  );
}
