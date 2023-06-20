import axios from "axios";
import React, { useState } from "react";

export default function NickChange() {
  const [nickname, setNickname] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // 새로고침 막기
    console.log("nickname", nickname);
    try {
      const response = await axios.put("/userInfos/reUser", { nickname });
      console.log(response.status);
      console.log(response.data); // 로그인 성공 시 받아온 데이터 처리
      console.log("response닉네임", response.data.nickname); // 로그인 성공 시 받아온 데이터 처리

      // window.location.reload(); // 새로고침
    } catch (error) {
      console.error(error); // 에러 처리
      if (error.code !== 200 && error.code === 401) {
        alert(`${error.response.data.message}`);
      } else {
        alert(error);
      }
    }
  };

  return (
    <div className="nickchange">
      <div className="box-whole">
        <p className="myname">아이디명 님!</p>
        <p className="changeNameTitle">닉네임 변경하기</p>
        <form onSubmit={handleFormSubmit}>
          <label className='labelForm' htmlFor="nickname">
            새 닉네임 : 
            <input
              className="labelInput"
              id="nickname"
              type="text"
              placeholder="새 닉네임을 적어주세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </label>
          <button className="checkBtn" type="button">닉네임 중복확인</button>
          <br />
          <button className="changeBtn" type="submit">변경하기</button>
        </form>
      </div>
    </div>
  );
}
