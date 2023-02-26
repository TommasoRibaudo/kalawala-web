import React from "react";

const FixedNavigation: React.FC = () => {
  return (
    <header id="navigation" className="navbar navigation">
      <div className="container">
        <div className="navbar-header">
          {/* responsive nav button */}
          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target=".navbar-collapse"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          {/* /responsive nav button */}

          {/* logo */}
          <a className="navbar-brand logo" href="#body">
            {/* <img src="images/logo.png" alt="Website Logo" /> */}
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
          </a>
          {/* /logo */}
        </div>

        {/* main nav */}
        <nav className="collapse navbar-collapse navbar-right" role="Navigation">
          <ul id="nav" className="nav navbar-nav navigation-menu">
            <li>
              <a data-scroll href="#body">
                Home
              </a>
            </li>
            <li>
              <a data-scroll href="#portfolio">
                Photos
              </a>
            </li>
            <li>
              <a data-scroll href="#testimonial">
                Reviews
              </a>
            </li>
            <li>
              <a data-scroll href="#contact-us">
                Contact
              </a>
            </li>
          </ul>
        </nav>
        {/* /main nav */}
      </div>
    </header>
  );
};

export default FixedNavigation;
