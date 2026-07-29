import React, { useState, useRef } from "react";
import './FixedNavigation.style.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import SolidBars from "../../assets/images/bars-solid.svg";
import { LanguageSwitcher } from "../FlagComponent/Flag.component";

interface IFixedNavigation {
  isBlog: boolean
}

const FixedNavigationNamES = ({ isBlog }: IFixedNavigation) => {
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
        <Navbar.Brand href="/HomeNamES#body" className="d-flex align-items-center">
          <img 
            src="https://lh3.googleusercontent.com/d/1z6ekQR8hrkzw_-6rUuNeRxyakDo2pdfn=w1000" 
            alt="Reservas Kalawala" 
            className="logo"
            width="150"
            height="52"
            loading="eager"
          />
        </Navbar.Brand>
        <div className="mobile-controls">
          <a href="HomeNamES#body" className="nav-cta-btn" onClick={() => { handleLinkClick("HomeNamES#body") }}>
            Reservar
          </a>
          <div className="mobile-flag">
            <LanguageSwitcher />
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="dark-nav" onClick={handleToggleClick}>
            <img 
              src={SolidBars} 
              style={{ height: "25px", width: "25px" }}
              width="25"
              height="25"
              alt="Menu"
            />
          </Navbar.Toggle>
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navMenu me-auto">
          <Nav.Link href="HomeNamES#body" className={`navText${(isActive && !isBlog) ? ' active' : ''}`} onClick={closeMenu}>Inicio</Nav.Link>
            <Nav.Link href="/blogES" className={`navText${(isActive && isBlog) ? ' active' : ''}`} onClick={closeMenu}>Blog</Nav.Link>
            <Nav.Link href="/portalES" className="navText" onClick={(e: React.MouseEvent) => { e.preventDefault(); handleLinkClick("portalES") }}>Mi Reserva</Nav.Link>
            <Nav.Link href="https://wa.me/50684632276" className="navText" target="_blank" rel="noopener noreferrer">WhatsApp</Nav.Link>
          </Nav>
        <div className="navbar-flag">
            <a href="HomeNamES#body" className="nav-cta-btn" onClick={() => { handleLinkClick("HomeNamES#body") }}>
              Reservar
            </a>
            <LanguageSwitcher />
        </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default FixedNavigationNamES;
