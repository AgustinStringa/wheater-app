import React from "react";
import MasDatos from "./MasDatos";
import { toCelsius, firstUpperCase } from "../helpers/helper-result-panel";

const ResultPanel = ({
  apiData: {
    name,
    temp,
    temp_max,
    temp_min,
    feels_like,
    main,
    description,
    icon,
    speed,
    deg,
    gust,
    humidity,
    pressure,
  },
}) => {
  return (
    <>
      <div className="center-align card-panel">
        <h2>La temperatura en {name} es: </h2>
        <p className="temperatura">
          {toCelsius(temp)} <span>°C</span>
          <img
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="Imagen descriptiva del tiempo"
          />
        </p>
        <p>Temperatura Máxima: {toCelsius(temp_max)} °C</p>
        <p>Temperatura Mínima: {toCelsius(temp_min)} °C</p>
      </div>
      <MasDatos
        feels_like={toCelsius(feels_like)}
        main={main}
        description={firstUpperCase(description)}
        wind={{ speed, deg, gust }}
        humidity={humidity}
        pressure={pressure}
      ></MasDatos>
    </>
  );
};

export default ResultPanel;
