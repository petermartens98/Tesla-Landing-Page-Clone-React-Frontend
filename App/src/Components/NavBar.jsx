import React, { useEffect, useState } from 'react';
import styled from "styled-components";

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px;
  background-color: transparent;
  position: fixed;
  top: 65px; /* adjust this value as needed */
  left: 0;
  right: 0;
  z-index: 1;
`;

const Logo = styled.img`
  height: 25px;
  margin-left: 10px;
  @media only screen and (max-width: 810px) {
    height:40px;
  }
`;

const NavbarLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 14px;
`;

const NavLink = styled.a`
  color: black;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.4s ease-in-out;
  padding: 10px 10px;
  margin-right:3px;
  &:hover {
    background-color: rgba(224, 224, 224, 0.5);
    border-bottom-color: gray;
  }
`;

const NavBar = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  let navModelLinks;
  if (screenWidth > 680) {
    navModelLinks = (
        <NavbarLinks>
          <NavLink href="/model-s">Model S</NavLink>
          <NavLink href="/model-3">Model 3</NavLink>
          <NavLink href="/model-x">Model X</NavLink>
          <NavLink href="/model-y">Model Y</NavLink>
        </NavbarLinks>
    );
  } else {
    navModelLinks = (
      <NavbarLinks>
        <NavLink href="/model-s">S</NavLink>
        <NavLink href="/model-3">3</NavLink>
        <NavLink href="/model-x">X</NavLink>
        <NavLink href="/model-y">Y</NavLink>
      </NavbarLinks>
    );
  }

  const handleNavClick = (e) => {
    e.preventDefault();
    const currentPath = window.location.pathname;
    window.location.href = currentPath;
  };
  
  let navMenuLinks;
  if (screenWidth > 1040) {
    navMenuLinks = (
      <NavbarLinks>
        <NavLink href="/" onClick={handleNavClick}>Shop</NavLink>
        <NavLink href="/" onClick={handleNavClick}>Account</NavLink>
        <NavLink href="/" onClick={handleNavClick}>Menu</NavLink>
      </NavbarLinks>
    )
  } else {
    navMenuLinks = (
      <NavbarLinks>
        <NavLink href="/" onClick={handleNavClick}>Menu</NavLink>
      </NavbarLinks>
    );
  }
  

  if (screenWidth > 810) {
    return (
      <NavbarContainer>
        <Logo src="/TeslaTextLogo.png" alt="logo" />
        {navModelLinks}
        {navMenuLinks}
      </NavbarContainer>
    );
  } else {
    return (
      <NavbarContainer>
        <Logo src="/TeslaTLogoBlack.png" alt="logo" />
        {navModelLinks}
        {navMenuLinks}
      </NavbarContainer>
    );
  }
}


export default NavBar;



