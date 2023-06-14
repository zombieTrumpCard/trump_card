import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  background-image: url(./background.jpg);
  background-size: cover;
`;

export const Title = styled.div`
  position: absolute;
  width: 353px;
  height: 105px;
  top: 150px;
  left: 50%;
  transform: translateX(-50%);

  font-family: "Mali-Regular";
  font-weight: 400;
  font-size: 96px;
  text-align: center;
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

export const Level1Button = styled.div`
  position: absolute;
  top: 350px;
  left: 35%;
  transform: translateX(-50%);

  border: none;
  border-radius: 20px;
  width: 119px;
  height: 153px;
  background-color: #ffffff;

  font-family: "Mali-Regular";
  font-weight: 400;
  font-size: 60px;
  color: #000000;
  text-align: center;
`;

export const Level2Button = styled.div`
  position: absolute;
  top: 350px;
  left: 50%;
  transform: translateX(-50%);

  border: none;
  border-radius: 20px;
  width: 119px;
  height: 153px;
  background-color: #ffffff;

  font-family: "Mali-Regular";
  font-weight: 400;
  font-size: 60px;
  color: #000000;
  text-align: center;
`;

export const Level3Button = styled.div`
  position: absolute;
  top: 350px;
  left: 65%;
  transform: translateX(-50%);

  border: none;
  border-radius: 20px;
  width: 119px;
  height: 153px;
  background-color: #ffffff;

  font-family: "Mali-Regular";
  font-weight: 400;
  font-size: 60px;
  color: #000000;
  text-align: center;
`;
