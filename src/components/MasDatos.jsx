import React, { useEffect } from "react";
import M from "materialize-css";
import PropTypes from "prop-types";

const MasDatos = ({
  feels_like,
  main,
  description,
  wind: { speed, deg, gust },
  humidity,
  pressure,
}) => {
  const iniciarCollapsables = () => {
    var collap_elems = document.querySelectorAll(".collapsible");
    if (collap_elems) {
      M.Collapsible.init(collap_elems, { accordion: true });
    }
  };

  useEffect(() => {
    iniciarCollapsables();
  }, [feels_like, main, description]);

  return (
    <>
      <ul className="collapsible black-text">
        <li>
          <div className="collapsible-header">
            <i className="material-icons black-text">thermostat</i>Feels like
          </div>
          <div className="collapsible-body">
            <span>{feels_like}°C</span>
          </div>
        </li>
        <li>
          <div className="collapsible-header">
            <i className="material-icons black-text">storm</i>Main
          </div>
          <div className="collapsible-body">
            <span>{main}</span>
          </div>
        </li>
        <li>
          <div className="collapsible-header">
            <i className="material-icons black-text">ac_unit</i>Description
          </div>
          <div className="collapsible-body">
            <span>"{description}"</span>
          </div>
        </li>
        <li>
          <div className="collapsible-header">
            <i className="material-icons black-text">air</i>Wind
          </div>
          <div className="collapsible-body">
            <span className="span-title">Speed:</span> {speed}
            <br />
            <span className="span-title">Degree:</span> {deg}
            <br />
            <span className="span-title">Gust:</span> {gust}
          </div>
        </li>
        <li>
          <div className="collapsible-header">
            <i className="material-icons black-text">analytics</i>More...
          </div>
          <div className="collapsible-body">
            <span className="span-title">Humidity:</span> {humidity} %
            <br />
            <span className="span-title">Pressure:</span> {pressure} hPa
          </div>
        </li>
      </ul>
    </>
  );
};
/**
 * todas propiedades del objeto de respuest. Estas vienen desde la app pero llegan al component por medio del component ResultPanel, ya que este se implementa desde ahí.
 */
MasDatos.propTypes = {
  feels_like: PropTypes.number,
  main: PropTypes.string,
  description: PropTypes.string,
  wind: PropTypes.object,
  humidity: PropTypes.number,
  pressure: PropTypes.number,
};

export default MasDatos;
