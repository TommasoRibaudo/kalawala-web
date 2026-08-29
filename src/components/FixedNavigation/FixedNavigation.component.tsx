import React, { useState, useRef, useEffect } from "react";
import './FixedNavigation.style.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation, useNavigate } from "react-router-dom";
import SolidBars from "../../assets/images/bars-solid.svg";
import KalawalaLogo from "../../assets/images/logo-cream.png";
import { LanguageSwitcher } from "../FlagComponent/Flag.component";
import { useLocale, messagesFor } from "../../i18n";
import type { Locale } from "../../i18n";
import { bookingPath, bookingLanguage, homePath, blogPath, portalPath } from "../../i18n/paths";
import { useApplyStoredLocalePreference } from "../../i18n/localePreference";
import { trackContactWhatsappClicked } from "../../services/BookingAnalytics.service";

interface IFixedNavigation {
  isBlog: boolean
  /**
   * Overrides the locale taken from the URL. Only `Booking.page` needs it: that
   * page also treats a hand-typed lowercase `/bookes` as Spanish, which
   * `detectLocaleFromPath` deliberately does not match (it is case-sensitive, so
   * that a future route ending in "es" is not mistaken for Spanish). Without
   * this the nav would render in English on a page whose body is Spanish.
   */
  locale?: Locale
}

/**
 * PHASE 3a merged the Spanish copy into this one.
 *
 * **It fixes a live bug.** The Spanish nav's Home link was `HomeES#body` with no
 * leading slash — a *relative* href. From `/blogES` it happened to resolve to
 * `/HomeES#body`, but Phase 0 established that every URL on this site 301s to a
 * trailing slash, and from `/blogES/` the same href resolves to
 * `/blogES/HomeES#body`, which is a 404. Every link now comes from a path
 * helper, so none of them can be relative.
 *
 * Two smaller unifications, both onto the English behaviour:
 *  - The menu toggle image keeps English's explicit width/height attributes.
 *    Spanish set only a height in a style prop, which leaves the intrinsic size
 *    unknown until the SVG loads and lets the button shift.
 *  - The brand link is `<home>#body` in both languages. Spanish linked to
 *    `/HomeES` with no fragment; adding it matches English and the nav's own
 *    Home link.
 */
const FixedNavigation = ({ isBlog, locale: localeOverride }: IFixedNavigation) => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const navbarRef = useRef<HTMLDivElement>(null);
  const detectedLocale = useLocale();
  const locale = localeOverride ?? detectedLocale;
  const m = messagesFor(locale);
  useApplyStoredLocalePreference();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const delta = Math.abs(window.scrollY - lastScrollY);
      lastScrollY = window.scrollY;
      if (delta > 50) closeMenu();
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleToggleClick = (event: any) => {
    // Handle toggle click
  };

  const navigate = useNavigate();
  const location = useLocation();

  // Takes a full path now. It used to take a bare segment and prepend the
  // slash, which meant the caller wrote "book" while the href next to it read
  // "/book" — two spellings of one route, and the Spanish copy got them out of
  // step. The path helpers return a leading slash, so it takes them verbatim.
  const handleLinkClick = (path: string) => {
    navigate(path);
    setIsActive(false);
    closeMenu();
  };

  // The booking wizard's step is derived from the URL's query string, so
  // navigating to the bare booking path while already on it (e.g. a guest
  // tapping "Book now" again mid-search) would silently rewind them to step
  // 1 and drop their dates/results. Only close the menu in that case.
  const isOnBookingPage = location.pathname === bookingPath(locale);
  const handleBookNowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOnBookingPage) {
      setIsActive(false);
      closeMenu();
      return;
    }
    handleLinkClick(bookingPath(locale));
  };

  const closeMenu = () => {
    // Force close the Bootstrap collapse if it's open
    const collapseElement = navbarRef.current?.querySelector('.navbar-collapse');
    if (collapseElement && collapseElement.classList.contains('show')) {
      const toggleButton = navbarRef.current?.querySelector('.navbar-toggler');
      if (toggleButton) {
        (toggleButton as HTMLElement).click();
      }
    }
  };

  return (
    <Navbar ref={navbarRef} className="navigation" expand="lg" sticky="top" variant="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href={`${homePath(locale)}#body`} className="d-flex align-items-center">
          <img
            src={KalawalaLogo}
            alt="Reservas Kalawala"
            className="logo"
            width="150"
            height="47"
            loading="eager"
          />
        </Navbar.Brand>
        <div className="mobile-controls">
          <a href={bookingPath(locale)} className="nav-cta-btn" aria-current={isOnBookingPage ? 'page' : undefined} onClick={handleBookNowClick}>
            {m.nav.bookNow}
          </a>
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
            <Nav.Link href={`${homePath(locale)}#body`} className={`navText${(isActive && !isBlog) ? ' active' : ''}`} onClick={closeMenu}>{m.nav.home}</Nav.Link>
            <Nav.Link href={blogPath(locale)} className={`navText${(isActive && isBlog) ? ' active' : ''}`} onClick={closeMenu}>{m.nav.blog}</Nav.Link>
            <Nav.Link href={portalPath(locale)} className="navText" onClick={(e: React.MouseEvent) => { e.preventDefault(); handleLinkClick(portalPath(locale)) }}>{m.nav.myBooking}</Nav.Link>
            <Nav.Link
              href="https://wa.me/50684632276"
              className="navText"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContactWhatsappClicked({ location: 'nav', language: bookingLanguage(locale) })}
            >
              WhatsApp
            </Nav.Link>
          </Nav>
          <div className="mobile-flag">
            <LanguageSwitcher />
          </div>
        <div className="navbar-flag">
            <a href={bookingPath(locale)} className="nav-cta-btn" aria-current={isOnBookingPage ? 'page' : undefined} onClick={handleBookNowClick}>
              {m.nav.bookNow}
            </a>
            <LanguageSwitcher />
        </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default FixedNavigation;
