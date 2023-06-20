import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserCreate() {
  const [id, setId] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [nickname, setNickname] = useState("");
  const [phonenum, setPhonenum] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // axios 인스턴스 생성
  const api = axios.create({
    baseURL: "http://192.168.0.50:1788", // 서버 주소
    withCredentials: true, // CORS 요청 처리를 위한 옵션 설정
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // 새로고침 막기
    console.log(
      "id",
      id,
      "password",
      password2,
      "nickname",
      nickname,
      "phonenum",
      phonenum
    );
    try {
      const response = await api.post("/userInfos/join", {
        id,
        password: password2,
        nickname,
        phonenum,
      });
      console.log(response.status);
      console.log(response.data); // 로그인 성공 시 받아온 데이터 처리
      // window.location.reload(); // 새로고침
      alert("회원가입되었습니다!");
      navigate("/");
    } catch (error) {
      console.error(error); // 에러 처리
      if (error.code !== 200 && error.code !== 500) {
        // alert(`${error.response.data.message}`);
      }
      // 로그인 실패 처리
      alert("회원가입 실패");
    }
  };

  const checkNick = async () => {
    console.log("nickname", nickname);
    try {
      const response = await api.get("userInfos/checkNickname", {
        params: {
          nickname,
        },
      });
      console.log(response);
      if(response.data === true){
        alert("사용할 수 있는 닉네임입니다.")
      }
    } catch (error) {
      console.log(error);
      // error.code === 409 충돌
      if (error.code !== 200) {
        alert(`${error.response.data.message}`);
      } else {
        alert(error);
      }
    }
  };

  const checkId = async () => {
    console.log("id", id);
    try {
      const response = await api.get("userInfos/checkId", {
        params: {
          id,
        },
      });
      console.log(response);
      if(response.data === true){
        alert("사용할 수 있는 아이디입니다.")
      }
    } catch (error) {
      console.log(error);
      // error.code === 409 충돌
      if (error.code !== 200) {
        alert(`${error.response.data.message}`);
        // alert(`${error}`);
      } else {
        alert(error);
      }
    }
  };

  const validatePassword = (e) => {
    if (e.target.value === password1) {
      setMessage("비밀번호가 일치합니다");
    } else {
      setMessage("비밀번호가 일치하지않습니다");
    }
  };

  return (
    <div className="usercreate">
      <div className="box-whole">
        {/* <div className="box">
          <form className="form" onSubmit={handleFormSubmit}>
            <h1>회원가입</h1>
            <div className="form-row">
              <label htmlFor="nickname">
                닉네임
                <input
                  id="nickname"
                  type="text"
                  placeholder="닉네임을 입력하세요"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </label>
              <input
                className="input-btn"
                type="button"
                value="닉네임 중복확인"
              />
            </div>
            <div className="form-row">
              <label htmlFor="id">
                아이디
                <input
                  id="id"
                  type="text"
                  placeholder="ID을 입력하세요"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </label>
              <input className="input-btn" type="button" value="ID 중복확인" />
            </div>
            <div className="form-row">
              <label htmlFor="pw1">
                비밀번호
                <input
                  id="pw1"
                  type="password"
                  placeholder="PW을 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            <div className="form-row">
              <label htmlFor="pw2">
                비밀번호 확인
                <input
                  id="pw2"
                  type="password"
                  placeholder="PW을 입력하세요2"
                />
              </label>
            </div>
            <div className="form-row">
              <label htmlFor="phonenum">
                전화번호
                <input
                  id="phonenum"
                  type="text"
                  placeholder="전화번호를 입력하세요"
                  value={phonenum}
                  onChange={(e) => setPhonenum(e.target.value)}
                />
                <br></br>
                <br></br>
                <br></br>
              </label>
            </div>
            <button className="submit-btn" type="submit">
              가입하기
            </button>
          </form>
        </div> */}
        <form className="form" onSubmit={handleFormSubmit}>
          <table>
            <tbody>
              <tr>
                <td colSpan={3}>
                  <h1>회원가입</h1>
                </td>
              </tr>
              <tr>
                <td>닉네임</td>
                <td>
                  <input
                    id="nickname"
                    type="text"
                    placeholder="닉네임을 입력하세요"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    className="input-btn"
                    type="button"
                    value="닉네임 중복확인"
                    onClick={checkNick}
                  />
                </td>
              </tr>
              <tr>
                <td>아이디</td>
                <td>
                  <input
                    id="id"
                    type="text"
                    placeholder="ID을 입력하세요"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    className="input-btn"
                    type="button"
                    value="ID 중복확인"
                    onClick={checkId}
                  />
                </td>
              </tr>
              <tr>
                <td>비밀번호</td>
                <td>
                  <input
                    id="pw1"
                    type="password"
                    placeholder="PW을 입력하세요"
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                  />
                </td>
                <td>{message}</td>
              </tr>
              <tr>
                <td>비밀번호 확인</td>
                <td>
                  <input
                    id="pw2"
                    type="password"
                    placeholder="PW을 입력하세요2"
                    value={password2}
                    onChange={(e) => {
                      setPassword2(e.target.value);
                      validatePassword(e);
                    }}
                  />
                </td>
                <td></td>
              </tr>
              <tr>
                <td>전화번호</td>
                <td>
                  <input
                    id="phonenum"
                    type="text"
                    placeholder="전화번호를 입력하세요"
                    value={phonenum}
                    onChange={(e) => setPhonenum(e.target.value)}
                  />
                </td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  <button className="submit-btn" type="submit">
                    가입하기
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}
