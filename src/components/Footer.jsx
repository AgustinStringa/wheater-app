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
              </a>
              . Utilizando la API{" "}
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
                <a className=" text-lighten-3" href="#!">
                  Link 1
                </a>
              </li>
              <li>
                <a className=" text-lighten-3" href="#!">
                  Link 2
                </a>
              </li>
              <li>
                <a className="text-lighten-3" href="#!">
                  Link 3
                </a>
              </li>
              <li>
                <a className=" text-lighten-3" href="#!">
                  Link 4
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © 2014 Copyright Text
          <a className=" text-lighten-4 right" href="#!">
            More Links
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
