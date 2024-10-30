import React, { useState } from "react";
import './FixedNavigation.style.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import { getHighestId } from "../../assets/blogs/blogs";
import SolidBars from "../../assets/images/bars-solid.svg";
import { ES } from 'country-flag-icons/react/3x2'
import { LanguageSwitcher } from "../FlagComponent/Flag.component";

interface IFixedNavigation {
  isBlog: boolean
}

const FixedNavigationRib = ({ isBlog }: IFixedNavigation) => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const handleToggleClick = (event: any) => {
    if (event.currentTarget.classList.contains('collapsed')) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  };

  const navigate = useNavigate();

  const handleLinkClick = (url: string) => {
    navigate(`/${url}`);
    setIsActive(false);
  };

  return (
    <Navbar className="navigation" expand="lg" sticky="top" variant="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="HomeVillas#body" className="d-flex align-items-center">
          <img src="https://drive.google.com/thumbnail?id=1ffAwVfOSmHVIZEYzZ-ImppJFclZSQlpN&sz=w1000" alt="logo" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="dark-nav" onClick={handleToggleClick}>
          <img src={SolidBars} style={{ height: "25px" }} />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navMenu me-auto">
            <Nav.Link href="HomeVillas#body" className={`navText ${(isActive && !isBlog) ? 'active' : ''}`}>Home</Nav.Link>
            <Nav.Link href="HomeVillas#callToAction" className="navText" onClick={() => { handleLinkClick("HomeVillas#callToAction") }}>Availability</Nav.Link>
            <Nav.Link href="HomeVillas#portfolio" className="navText" onClick={() => { handleLinkClick("HomeVillas#portfolio") }}>Photos</Nav.Link>
            <Nav.Link href="HomeVillas#contact-us" className="navText" onClick={() => { handleLinkClick("HomeVillas#contact-us") }}>Contact</Nav.Link>
            <Nav.Link href="/twodaysinpuertoviejo" className={`navText ${(isActive && isBlog) ? 'active' : ''}`}>Blog</Nav.Link>
          </Nav>
        <div className="navbar-flag">
            <LanguageSwitcher />
        </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default FixedNavigationRib;
