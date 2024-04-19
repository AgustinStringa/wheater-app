import React from "react";

const Footer = () => {
  return (
    <footer className="teal">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="">React Weather App</h5>
            <p className="text-lighten-4">
              Aplicación de consulta de clima realizada para el curso de React
              de{" "}
              <a
                className="footer-link"
                href="https://codigoconjuan.com/"
                alt="sitio web instructor del curso"
              >
                Juan Pablo de la Torre Valdez
              </a>{" "}
              utilizando la API{" "}
              <a
                className="footer-link"
                href="https://openweathermap.org/"
                alt="enlace a la API de desarrollo de la APP"
              >
                Open Weather Map
              </a>
            </p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="">Links</h5>
            <ul>
              <li>
                <a
                  className="footer-link text-lighten-3"
                  href="https://www.linkedin.com/in/agustin-stringa-01718a212/"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  className="footer-link text-lighten-3"
                  href="https://github.com/AgustinStringa"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
