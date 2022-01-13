import React from "react";

const Header = () => {
  return (
    <header>
      <nav>
        <div className="nav-wrapper">
          <a
            href="#!"
            className="brand-logo card-panel teal accent-4 white-text center-align"
            style={{ marginTop: 0, fontSize: "3rem" }}
          >
            React Weather App
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
