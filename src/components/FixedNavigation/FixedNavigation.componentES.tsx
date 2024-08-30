import React, { useState } from "react";
import './FixedNavigation.style.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import { getHighestId } from "../../assets/blogs/blogs";
import SolidBars from "../../assets/images/bars-solid.svg";
import { ES, US } from 'country-flag-icons/react/3x2'

interface IFixedNavigationES {
  isBlog: boolean
}

const FixedNavigationES = ({ isBlog }: IFixedNavigationES) => {
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
        <Navbar.Brand href="/HomeES" className="d-flex align-items-center">
          <img src="https://drive.google.com/thumbnail?id=1z6ekQR8hrkzw_-6rUuNeRxyakDo2pdfn&sz=w1000" alt="logo" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="dark-nav" onClick={handleToggleClick}>
          <img src={SolidBars} style={{ height: "25px" }} />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navMenu me-auto">
            <Nav.Link href="HomeES#body" className={`navText ${(isActive && !isBlog) ? 'active' : ''}`}>Inicio</Nav.Link>
            <Nav.Link href="HomeES#callToActionES" className="navText" onClick={() => { handleLinkClick("HomeES#callToActionES") }}>Disponibilidad</Nav.Link>
            <Nav.Link href="HomeES#portfolioES" className="navText" onClick={() => { handleLinkClick("HomeES#portfolio") }}>Fotos</Nav.Link>
            <Nav.Link href="HomeES#contact-us" className="navText" onClick={() => { handleLinkClick("HomeES#contact-us") }}>Contactanos</Nav.Link>
            <Nav.Link href="/twodaysinpuertoviejoES" className={`navText ${(isActive && isBlog) ? 'active' : ''}`}>Blog</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div className="navbar-flag">
          <a href="/">
            <US title="Ingles" />
            </a>
        </div>
      </Container>
    </Navbar>
  );
};

export default FixedNavigationES;
