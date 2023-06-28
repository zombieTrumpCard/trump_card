import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Levelpage from "./pages/gameCard/Levelpage";
import Header from "./components/account/Header";
import HeaderNew from "./components/account/HeaderNew";
import Home from "./pages/Home";
import MyPage from "./pages/account/Mypage";
import NickChange from "./pages/account/NickChange";
import Rank from "./pages/rank/Rank";
import UserCreate from "./pages/account/UserCreate";
import Store from "./pages/store/Store";
import UserDrop from "./pages/account/UserDrop";
import GameEasy from "./pages/gameCard/GameEasy";
import GameNormal from "./pages/gameCard/GameNormal";
import GameHard from "./pages/gameCard/GameHard";
import GameOver from "./pages/gameCard/GameOver";
import GameEnd from "./pages/gameCard/GameEnd";
import WordGame from "./pages/gameWord/Word";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route
          path="/userCreate"
          element={
            <>
              <Header />
              <UserCreate />
            </>
          }
        />
        <Route
          path="/mypage"
          element={
            <>
              <Header />
              <MyPage />
            </>
          }
        />
        <Route
          path="/rank"
          element={
            <>
              <Header />
              <Rank />
            </>
          }
        />
        <Route
          path="/store"
          element={
            <>
              <Header />
              <Store />
            </>
          }
        />
        <Route
          path="/wordGame"
          element={
            <>
              <WordGame />
            </>
          }
        />
        <Route
          path="/nickChange"
          element={
            <>
              <Header />
              <NickChange />
            </>
          }
        />
        <Route
          path="/dropuser"
          element={
            <>
              <Header />
              <UserDrop />
            </>
          }
        />
        <Route path="/level" element={<Levelpage />} />
        <Route path="/gameeasy" element={<GameEasy />} />
        <Route path="/gamenormal" element={<GameNormal />} />
        <Route path="/gamehard" element={<GameHard />} />
        <Route path="/gameover" element={<GameOver />} />
        <Route path="/gameend" element={<GameEnd />} />
        <Route path="/level" element={<Levelpage />} />
        <Route path="/gameeasy" element={<GameEasy />} />
        <Route path="/gamenormal" element={<GameNormal />} />
        <Route path="/gamenhard" element={<GameHard />} />
        <Route path="/gameover" element={<GameOver />} />
        <Route path="/gameend" element={<GameEnd />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
