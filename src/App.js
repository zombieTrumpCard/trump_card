import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import MyPage from './pages/Mypage';

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
        {/* <Route path="/game" elements={ChooseLevel} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
