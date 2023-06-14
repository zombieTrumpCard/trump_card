import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  background-image: url(./background.jpg);
  background-size: cover;
`;

export const HomeButton = styled.div` 
  width: 203px;
  height: 75px;
  margin-left: auto;

  font-family: "Mali-Regular";
  font-weight: 400;
  font-size: 60px;
  text-align: center;
`;

export const StartButton = styled.div`
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);

  border: none;
  border-radius: 20px;
  width: 250px;
  height: 322px;
  background-color: #ffffff;

  font-family: "Mali-Regular";
  font-weight: 400;
  font-size: 80px;
  color: #000000;
  text-align: center;
`;