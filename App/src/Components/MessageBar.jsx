import React from 'react';
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: 0;
    background-color: white; 
    padding: 10px;
    height:20px;
    font-size: 18px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2; /* increase z-index value */
    @media only screen and (max-width: 768px) {
      /* For screens smaller than 768px wide */
      font-size:18px;
    }
`

const LinkWrapper = styled.span`
    text-decoration: underline;
    font-weight: bold;
    margin-left: 10px;
    cursor:pointer;
`

const MessageBar = ({msg}) => {
  return (
    <Container>
      {msg}<LinkWrapper>Learn More</LinkWrapper>
    </Container>
  );
};

export default MessageBar;
