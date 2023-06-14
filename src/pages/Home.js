import React from 'react';

export default function Home() {
  const divStyle = {
    width: '100%',
    height: '7rem',
    backgroundColor: 'palegreen',
  };

  const gameScreenStyle = {
    width: '60%',
    height: '30rem',
    margin: 'auto',
    backgroundColor: 'yellow',
  };

  return (
    <>
      <div style={divStyle} />
      <p>Home Page is here.</p>
      <div style={gameScreenStyle}>게임</div>
    </>
  );
}
