import React, { useState, useRef } from "react";
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

const FixedNavigationNamES = ({ isBlog }: IFixedNavigation) => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const navbarRef = useRef<HTMLDivElement>(null);

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
    closeMenu();
  };

  const closeMenu = () => {
    setIsCollapsed(true);
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
            src="https://drive.google.com/thumbnail?id=1z6ekQR8hrkzw_-6rUuNeRxyakDo2pdfn&sz=w1000" 
            alt="logo" 
            className="logo"
            height="52"
            loading="eager"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="dark-nav" onClick={handleToggleClick}>
          <img 
            src={SolidBars} 
            style={{ height: "25px", width: "25px" }}
            width="25"
            height="25"
            alt="Menu"
          />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navMenu me-auto">
          <Nav.Link href="HomeNamES#body" className={`navText ${(isActive && !isBlog) ? 'active' : ''}`} onClick={closeMenu}>Inicio</Nav.Link>
            <Nav.Link href="HomeNamES#body" className="navText" onClick={() => { handleLinkClick("HomeNamES#callToActionES") }}>Disponibilidad</Nav.Link>
            <Nav.Link href="HomeNamES#portfolioES" className="navText" onClick={() => { handleLinkClick("HomeNamES#portfolioES") }}>Fotos</Nav.Link>
            <Nav.Link href="HomeNamES#contact-usES" className="navText" onClick={() => { handleLinkClick("HomeNamES#contact-usES") }}>Contactanos</Nav.Link>
            <Nav.Link href="/twodaysinpuertoviejoES" className={`navText ${(isActive && isBlog) ? 'active' : ''}`} onClick={closeMenu}>Blog</Nav.Link>
          </Nav>
        <div className="navbar-flag">
            <LanguageSwitcher />
        </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default FixedNavigationNamES;
