import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Levelpage from './pages/Levelpage';
import Header from './components/Header';
import Home from './pages/Home';
import MyPage from './pages/Mypage';
import NickChange from './pages/NickChange';
import Rank from './pages/Rank';
import UserCreate from './pages/UserCreate';
import Store from './pages/Store';
import UserDrop from './pages/UserDrop';
import GameEasy from './pages/GameEasy';
import GameNormal from './pages/GameNormal';
import GameHard from './pages/GameHard';
import GameOver from './pages/GameOver';
import GameEnd from './pages/GameEnd';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={(
            <>
              <Home />
            </>
          )}
        />
        <Route
          path="/userCreate"
          element={(
            <>
              <Header />
              <UserCreate />
            </>
          )}
        />
        <Route
          path="/mypage"
          element={(
            <>
              <Header />
              <MyPage />
            </>
          )}
        />
        <Route
          path="/rank"
          element={(
            <>
              <Header />
              <Rank />
            </>
          )}
        />
        <Route
          path="/store"
          element={(
            <>
              <Header />
              <Store />
            </>
          )}
        />
        <Route
          path="/nickChange"
          element={(
            <>
              <Header />
              <NickChange />
            </>
          )}
        />
        <Route
          path="/dropuser"
          element={(
            <>
              <Header />
              <UserDrop />
            </>)}
        />
        <Route
          path="/level"
          element={(
            <Levelpage />
          )}
        />
        <Route
          path="/gameeasy"
          element={(
            <GameEasy />
          )}
        />
        <Route
          path="/gamenormal"
          element={(
            <GameNormal />
            )}
        />
        <Route
          path="/gamehard"
          element={(
            <GameHard />
          )}
        />
        <Route
          path="/gameover"
          element={(
            <GameOver />
          )}
        />
        <Route
          path="/gamenend"
          element={(
            <GameEnd />
          )}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
