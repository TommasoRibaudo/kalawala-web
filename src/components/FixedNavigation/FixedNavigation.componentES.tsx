import React, { useState, useRef } from "react";
import './FixedNavigation.style.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import SolidBars from "../../assets/images/bars-solid.svg";
import { LanguageSwitcher } from "../FlagComponent/Flag.component";

interface IFixedNavigationES {
  isBlog: boolean
}

const FixedNavigationES = ({ isBlog }: IFixedNavigationES) => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const navbarRef = useRef<HTMLDivElement>(null);

  const handleToggleClick = (event: any) => {
    // Handle toggle click
  };

  const navigate = useNavigate();

  const handleLinkClick = (url: string) => {
    navigate(`/${url}`);
    setIsActive(false);
    closeMenu();
  };

  const closeMenu = () => {
    // Force close the Bootstrap collapse if it's open
    const collapseElement = navbarRef.current?.querySelector('.navbar-collapse');
    if (collapseElement && !collapseElement.classList.contains('collapse')) {
      const toggleButton = navbarRef.current?.querySelector('.navbar-toggler');
      if (toggleButton) {
        (toggleButton as HTMLElement).click();
      }
    }
  };

  return (
    <Navbar ref={navbarRef} className="navigation" expand="lg" sticky="top" variant="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/HomeES" className="d-flex align-items-center">
          <img 
            src="https://drive.google.com/thumbnail?id=1z6ekQR8hrkzw_-6rUuNeRxyakDo2pdfn&sz=w1000" 
            alt="logo" 
            className="logo"
            height="52"
            loading="eager"
          />
        </Navbar.Brand>
        <div className="mobile-controls">
          <div className="mobile-flag">
            <LanguageSwitcher />
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="dark-nav" onClick={handleToggleClick}>
            <img src={SolidBars} style={{ height: "25px" }} alt="Menu toggle" />
          </Navbar.Toggle>
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navMenu me-auto">
            <Nav.Link href="HomeES#body" className={`navText ${(isActive && !isBlog) ? 'active' : ''}`} onClick={closeMenu}>Inicio</Nav.Link>
            <Nav.Link href="HomeES#body" className="navText" onClick={() => { handleLinkClick("HomeES#callToActionES") }}>Disponibilidad</Nav.Link>
            <Nav.Link href="HomeES#portfolioES" className="navText" onClick={() => { handleLinkClick("HomeES#portfolio") }}>Fotos</Nav.Link>
            <Nav.Link href="HomeES#contact-usES" className="navText" onClick={() => { handleLinkClick("HomeES#contact-us") }}>Contactanos</Nav.Link>
            <Nav.Link href="/twodaysinpuertoviejoES" className={`navText ${(isActive && isBlog) ? 'active' : ''}`} onClick={closeMenu}>Blog</Nav.Link>
          </Nav>
        <div className="navbar-flag">
            <LanguageSwitcher/>
        </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default FixedNavigationES;
