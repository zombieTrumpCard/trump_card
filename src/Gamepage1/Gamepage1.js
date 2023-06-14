import React from 'react';
import './Gamepage1.css';
import {
  Container, Title, HomeButton, Level1Button, Level2Button, Level3Button,
} from './styledComponents';

export default function Gamepage1() {
  return (
    <Container>
      <Title> Level </Title>
      <HomeButton onClick="location.href='index.html'"> HOME </HomeButton>
      <Level1Button onClick="location.href='index.html'"> 1 </Level1Button>
      <Level2Button onClick="location.href='index.html'"> 2 </Level2Button>
      <Level3Button onClick="location.href='index.html'"> 3 </Level3Button>
    </Container>
  );
}
