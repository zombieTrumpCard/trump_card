import React from 'react';
import './Gamepage3.css';
import { Container, HomeButton, StartButton } from './styledComponents';

export default function Gamepage1() {
  return (
    <Container>
      <HomeButton onClick="location.href='index.html'"> HOME </HomeButton>
      <StartButton onClick="location.href='index.html'"> Start </StartButton>
    </Container>
  );
}
