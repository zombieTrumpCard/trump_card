import axios from 'axios';
import React, { useState } from 'react';

export default function UserCreate() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [phonenum, setPhonenum] = useState('');

  // axios 인스턴스 생성
  const api = axios.create({
    baseURL: 'http://192.168.0.50:1788', // 서버 주소
    withCredentials: true, // CORS 요청 처리를 위한 옵션 설정
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // 새로고침 막기
    console.log(
      'id',
      id,
      'password',
      password,
      'nickname',
      nickname,
      'phonenum',
      phonenum,
    );
    try {
      const response = await api.post('/userInfos/join', {
        id,
        password,
        nickname,
        phonenum,
      });
      console.log(response.status);
      console.log(response.data); // 로그인 성공 시 받아온 데이터 처리
      // window.location.reload(); // 새로고침
      alert('회원가입되었습니다!');
    } catch (error) {
      console.error(error); // 에러 처리
      if (error.code !== 200 && error.code !== 500) {
        alert(`${error.response.data.message}`);
      }
      // 로그인 실패 처리
      // alert('일치하는 정보가 없습니다');
    }
  };
  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleFormSubmit}>
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
        <input type="button" value="닉네임 중복확인" />
        <br />

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
        <input type="button" value="ID 중복확인" />
        <br />

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
        <br />

        <label htmlFor="pw2">
          비밀번호 확인
          <input id="pw2" type="password" placeholder="PW을 입력하세요2" />
        </label>
        <br />

        <label htmlFor="phonenum">
          전화번호
          <input
            id="phonenum"
            type="text"
            placeholder="전화번호를 입력하세요"
            value={phonenum}
            onChange={(e) => setPhonenum(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}
