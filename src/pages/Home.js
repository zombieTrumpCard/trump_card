import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export default function Home() {
  const divStyle = {
    width: "100%",
    height: "7rem",
    backgroundColor: "skyblue",
  };

  const gameScreenStyle = {
    width: "60%",
    height: "30rem",
    margin: "auto",
    backgroundColor: "yellow",
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부
  const [showModal, setShowModal] = useState(false); // 모달
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  // const [toSignin, setToSignin] = useState(true); // true:로그인창 false:회원가입창
  const navigate = useNavigate();

  useEffect(() => {
    // 새로고침 시 로그인 상태를 복원
    const getCookie = cookies.get("accessToken");
    if (!!getCookie === true) {
      // token이 빈 값이 아니라면
      setIsLoggedIn(true);
      axios.defaults.headers.common.Authorization = `Bearer ${getCookie}`;
    }
  }, []);

  // 모달 열기
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // 로그아웃 처리
  const handleLogout = () => {
    setIsLoggedIn(false);
    // deleteCookie("isLoggedIn");
    deleteCookie("accessToken");
    // 헤더에서 Authorization 제거
    delete axios.defaults.headers.common.Authorization;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // 새로고침 막기
    console.log("id", id, "password", password);
    try {
      const response = await axios.post("/userInfos/login", { id, password });
      console.log(response.status);
      console.log(response.data); // 로그인 성공 시 받아온 데이터 처리
      const accessToken = response.data.token;

      // 토큰을 저장하는 쿠키 생성
      cookies.set("accessToken", accessToken);

      // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      // JWT 토큰을 쿠키에 설정
      // document.cookie = `token=${authToken}; path=/;`; // HttpOnly; Secure; HttpsOnly속성
      // console.log('authToken', authToken);

      // 로그인 상태 쿠키 생성
      // cookies.set("isLoggedIn", true);

      // 로그인 상태 변경
      setIsLoggedIn(true);

      // 모달창 끄기
      setShowModal(false);

      // window.location.reload(); // 새로고침
    } catch (error) {
      console.error(error); // 에러 처리
      if (error.code !== 200 && error.code === 401) {
        alert(`${error.response.data.message}`);
      } else {
        alert(error);
      }
      // 로그인 실패 처리
      // alert('일치하는 정보가 없습니다');
    }
  };

  // // 쿠키 읽어오는 함수
  // function getCookie(name) {
  //   const cookie = document.cookie.split(";").map((c) => c.trim());
  //   for (let i = 0; i < cookie.length; i += 1) {
  //     if (cookie[i].startsWith(`${name}=`)) {
  //       return cookie[i].substring(name.length + 1);
  //     }
  //   }
  //   return "";
  // }

  // 쿠키 삭제 함수
  function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  return (
    <>
      {/* 헤더 */}
      <div className="header">
        <Link to="/" className="title">
          트럼프 맞추기 게임
        </Link>
        {isLoggedIn ? (
          <div className="navbar">
            <Link to="/rank" className="nav-btn">
              랭킹
            </Link>
            <Link to="/store" className="nav-btn">
              상점
            </Link>
            <Link to="/mypage" className="nav-btn">
              내정보
            </Link>
            <button
              className="nav-btn"
              type="button"
              onClick={() => {
                handleLogout();
                navigate("/");
              }}
            >
              로그아웃
            </button>
          </div>
        ) : (
          <div className="navbar">
            <Link to="/rank" className="nav-btn">
              랭킹
            </Link>

            {/* Trigger/Open The Modal */}
            <button className="nav-btn" type="button" onClick={handleOpenModal}>
              로그인
            </button>

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
                  <p>로그인</p>
                  <form onSubmit={handleFormSubmit}>
                    <input
                      type="text"
                      className="form-control-text"
                      value={id}
                      placeholder="id:a4 pw:4444"
                      onChange={(e) => setId(e.target.value)}
                    />
                    <br />
                    <input
                      type="password"
                      className="form-control-text"
                      value={password}
                      placeholder="PW를입력하세요"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <button type="submit">로그인</button>
                  </form>
                  <button type="button">회원가입</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* 메인페이지 */}
      <div style={divStyle} />
      <p>Home Page is here.</p>
      {isLoggedIn ? (<div style={gameScreenStyle}>게임</div>) : <div onClick={handleOpenModal} style={gameScreenStyle}>게임</div>}
    </>
  );
}
