import React from "react";

const ResultPanel = ({ city, textCountry }) => {
  return (
    <div className="center-align">
      <p>
        El clima en {city}, {textCountry} es
      </p>
      <p>°C</p>
      <p>Temperatura Máxima: {} °C</p>
      <p>Temperatura Mínima: {} °C</p>
    </div>
  );
};

export default ResultPanel;
