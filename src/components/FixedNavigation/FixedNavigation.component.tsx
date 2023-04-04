import React, { useState } from "react";
import './FixedNavigation.style.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const FixedNavigation: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const handleClick = (event: any) => {
    if (event.currentTarget.classList.contains('collapsed')) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  };

  return (
    <Navbar className="navigation" expand="lg" sticky="top" variant="dark">
      <Container>
        <Navbar.Brand href="#body" className="d-flex align-items-center">
          <svg
            width="40px"
            height="40px"
            viewBox="0 0 45 44"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g id="Group" transform="translate(2.000000, 2.000000)" stroke="#57CBCC" strokeWidth="3">
                <ellipse id="Oval" cx="20.5" cy="20" rx="20.5" ry="20"></ellipse>
                <path
                  d="M6,7 L33.5,34.5"
                  id="Line-2"
                  strokeLinecap="square"
                ></path>
                <path
                  d="M21,20 L34,7"
                  id="Line-3"
                  strokeLinecap="square"
                ></path>
              </g>
            </g>
          </svg>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleClick} />
        <Navbar.Collapse id="basic-navbar-nav" className={`${isCollapsed}`} >
          <Nav className="navMenu" >
            <Nav.Link href="#body" className={`navText ${isActive && 'active'}`} >Home</Nav.Link>
            <Nav.Link href="#portfolio" className="navText" onClick={() => { setIsActive(false) }}>Photos</Nav.Link>
            <Nav.Link href="#testimonial" className="navText" onClick={() => { setIsActive(false) }}>Reviews</Nav.Link>
            <Nav.Link href="#contact-us" className="navText" onClick={() => { setIsActive(false) }}>Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar> 
  );
};

export default FixedNavigation;
