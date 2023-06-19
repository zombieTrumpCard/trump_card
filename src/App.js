import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Levelpage from './pages/Levelpage';
import Header from './components/Header';
import Home from './pages/Home';
import MyPage from './pages/Mypage';
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
              <Header />
              <Home />
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
          path="/gamenhard"
          element={(
            <GameEnd />
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
