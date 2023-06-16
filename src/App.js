import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Levelpage from './pages/Levelpage';
import Header from './components/Header';
import Home from './pages/Home';
import MyPage from './pages/Mypage';
import GameEasy from './pages/GameEasy';

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
        {/* <Route
          path="/gameeasy"
          element={(
            <GameEasy />
          )}
        />
      </Routes> */}
    </BrowserRouter>
  );
}

export default App;
