import React, { useEffect, useState } from 'react';
import MessageBar from '../Components/MessageBar';
import NavBar from '../Components/NavBar';
import styled from 'styled-components';
import { darken } from 'styled-components';

const modelImages = {
  models: `${process.env.PUBLIC_URL}/images/ModelS.jpg`,
  model3: `${process.env.PUBLIC_URL}/images/Model3.jpg`,
  modelx: `${process.env.PUBLIC_URL}/images/ModelX.jpg`,
  modely: `${process.env.PUBLIC_URL}/images/ModelY.jpg`,
};

const HomeContainer = styled.div`
`;

const StyledHome = styled.div`
  background-image: url(${props => modelImages[props.currentModel]});
  background-size: cover;
  height: 100vh;
  min-height: 580px;

  @media only screen and (min-width: 768px) {
    background-position: 50% 30%;
  }

  @media only screen and (max-width: 768px) {
    background-position: 35% 40%;
    ${props => props.currentModel === 'modely' && `
      background-position: 57% 50%;
  `}
  }
`;

const ModelTitle = styled.div`
  font-size: 60px;
  font-weight: bolder;
  font-family: 'Arial', sans-serif;
  color: black;
  position: absolute;
  top: clamp(160px, 22%, 400px); 
  left: 50%;
  transform: translate(-50%, -50%);
  @media only screen and (max-width: 768px) {
    font-size: 48px;
  }
`;

const ViewInvLink = styled.div`
  font-size: 20px;
  font-family: 'Arial', sans-serif;
  text-decoration: underline;
  color: black;
  position: absolute;
  top: clamp(220px, calc(22% + 60px), 480px);
  left: 50%;
  transform: translate(-50%, -50%);
  transition: 0.1s ease-in-out;
  &:hover{
    cursor: pointer;
    font-weight:bold;
  }
  @media only screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 480px; /* total width of both buttons (200px each) plus spacing (40px) */
  margin: 0 auto; /* center the wrapper div */
  position: fixed;
  top: clamp(320px, 90%, 1280px);
  left: 0;
  right: 0;
  @media (max-width: 768px) {
    top: clamp(370px, 90%, 1280px);
    flex-direction: column;
    align-items: center;
    gap:7px;
    width: 100%;
    bottom: 50px;
`;

const OrderNowButton = styled.button`
  font-size: 18px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.75);
  color: rgba(255,255,255,0.8);
  width:300px;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  transition: background-color 0.4s ease-in-out;
  &:hover {
    background-color: rgba(0, 0, 0, 0.85);
  }
`;

const DemoDriveButton = styled.button`
  font-size: 18px;
  background-color: rgba(255, 255, 255, 0.5);
  cursor:pointer;
  width:300px;
  color: black;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  transition: background-color 0.4s ease-in-out;
  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
  }
`;

const CarStats = styled.div`
  max-width: 820px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  margin: 0 auto;
  margin-bottom: 12 px;
  position: fixed;
  top: clamp(260px, calc(90% - 100px), 1280px);
  left: 0;
  right: 0;

  div {
    flex-basis: calc(100% / 3);
    text-align: center;

    b {
      font-size: 16px;
      color: #666;
      margin-top: 8px;
      margin-bottom: 4px;
      ${props => props.currentModel === 'modelx' && `
        color:darkgray;
      `}
    }

    span {
      font-size: 24px;
      font-weight: bold;
      color: #333;
    }
  }

`;
const Home = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [currentModel, setCurrentModel] = useState('models');

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const extension = currentPath.split('.').pop().replace(/[\/\-]/g, '');
    if (extension !== '') {
      setCurrentModel(extension);
    }
  }, []);

  const message =
    screenWidth < 768
      ? 'Up to $7,500 in tax credits.'
      : 'Up to $7,500 tax credit available for Model Y and Model 3.';

  const capitalize = (str) => {
    const firstLetter = str.charAt(0).toUpperCase();
    const lastLetter = str.slice(-1).toUpperCase();
    const middle = str.slice(1, -1);
    return `${firstLetter}${middle} ${lastLetter}`;
  };

  let range;
  let acceleration;
  let topSpeed;
  switch (currentModel) {
    case "models":
      range = 396;
      acceleration = 1.99;
      topSpeed = 200;
      break;
    case "model3":
      range = 325;
      acceleration = 3.1;
      topSpeed = 140;
      break;
    case "modelx":
      range = 333;
      acceleration = 2.5;
      topSpeed = 163;
      break;
    case "modely":
      range = 330;
      acceleration = 3.5;
      topSpeed = 155;
      break;
    default:
      range = 330;
      acceleration = 3.5;
      topSpeed = 155;
  };

  return (
    <>
    <HomeContainer>
      <NavBar />
        <MessageBar msg={message} />
        <NavBar />
        <StyledHome currentModel={currentModel}>
          <ModelTitle>{capitalize(currentModel)}</ModelTitle>
          <ViewInvLink>View Inventory</ViewInvLink>
          <CarStats currentModel={currentModel}>
          <div>
            <span>{range} mi</span>
            <br/>
            <b>Range</b>
          </div>
          <div>
            <span>{acceleration} s</span>
            <br/>
            <b>0-60 mph*</b>
          </div>
          <div>
            <span>{topSpeed} mph</span>
            <br/>
            <b>Top Speed†</b>
          </div>
          </CarStats>
          <ButtonWrapper>
            <OrderNowButton>Order Now</OrderNowButton>
            <div style={{ width: '40px' }}></div> {/* spacing between buttons */}
            <DemoDriveButton>Demo Drive</DemoDriveButton>
          </ButtonWrapper>
        </StyledHome>
    </HomeContainer>
    </>
  );
  };

export default Home;

