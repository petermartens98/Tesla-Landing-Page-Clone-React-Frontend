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

const StyledHome = styled.div`
  background-image: url(${props => modelImages[props.currentModel]});
  background-size: cover;
  height: 100vh;
  min-height: 480px;

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
  &:hover{
    cursor: pointer;
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
  top: clamp(300px, 85%, 1280px);
  left: 0;
  right: 0;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap:7px;
    width: 100%;
    bottom: 50px;
`;

const OrderNowButton = styled.button`
  font-size: 18px;
  cursor: pointer;
  background-color: rgba(39, 55, 70, 0.75);
  color: rgba(229, 231, 233, 1);
  width:300px;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  &:hover {
    background-color: rgba(39, 55, 70, 0.9);
  }
`;

const DemoDriveButton = styled.button`
  font-size: 18px;
  background-color: rgba(229, 231, 233, 0.75);
  cursor:pointer;
  width:300px;
  color: rgba(39, 55, 70, 1);
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  &:hover {
    background-color: rgba(229, 231, 233, 0.9);
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

  return (
    <>
      <MessageBar msg={message} />
      <NavBar />
      <StyledHome currentModel={currentModel}>
        <ModelTitle>{capitalize(currentModel)}</ModelTitle>
        <ViewInvLink>View Inventory</ViewInvLink>

        <ButtonWrapper>
          <OrderNowButton>Order Now</OrderNowButton>
          <div style={{ width: '40px' }}></div> {/* spacing between buttons */}
          <DemoDriveButton>Demo Drive</DemoDriveButton>
        </ButtonWrapper>
      </StyledHome>
    </>
  );
};

export default Home;

