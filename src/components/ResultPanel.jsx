import React, { useState } from "react";
import MasDatos from "./MasDatos";
import { toCelsius, firstUpperCase } from "../helpers/helper-result-panel";
import PropTypes from "prop-types";

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
  const [copiado, setCopiado] = useState(false);

  const handleCopiar = () => {
    const resumen = `Reporte del Clima - ${name}\n----------------------------\nTemperatura: ${toCelsius(temp)}°C\nCondición: ${firstUpperCase(description)}\nMáxima: ${toCelsius(temp_max)}°C | Mínima: ${toCelsius(temp_min)}°C\nSensación térmica: ${toCelsius(feels_like)}°C\nHumedad: ${humidity}%\nViento: ${speed} m/s`;
    navigator.clipboard?.writeText(resumen);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Tarjeta Principal de Temperatura */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/50">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
            <h2 className="text-base font-bold text-slate-800">
              La temperatura en {name} es:
            </h2>
          </div>

          <button
            type="button"
            onClick={handleCopiar}
            className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition-all hover:bg-slate-50"
            title="Copiar datos del clima"
          >
            {copiado ? "✓ Copiado" : "📋 Copiar"}
          </button>
        </div>

        {/* Hero Banner de Temperatura */}
        <div className="my-5 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-4">
            <span className="text-6xl font-black tracking-tight text-slate-800">
              {toCelsius(temp)}
              <span className="text-3xl font-light text-slate-400">°C</span>
            </span>
            {icon && (
              <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt="Imagen descriptiva del tiempo"
                className="h-20 w-20 filter drop-shadow-md"
              />
            )}
          </div>
          <span className="mt-1 rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700 ring-1 ring-sky-200/60">
            {firstUpperCase(description)}
          </span>
        </div>

        {/* Min / Max Pills */}
        <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 text-center">
          <div className="rounded-xl bg-slate-50 p-2.5">
            <span className="block text-[11px] font-semibold text-slate-500">Mínima</span>
            <p className="text-sm font-bold text-slate-700">
              Temperatura Mínima: {toCelsius(temp_min)} °C
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-2.5">
            <span className="block text-[11px] font-semibold text-slate-500">Máxima</span>
            <p className="text-sm font-bold text-slate-700">
              Temperatura Máxima: {toCelsius(temp_max)} °C
            </p>
          </div>
        </div>
      </div>

      <MasDatos
        feels_like={Number(toCelsius(feels_like))}
        main={main}
        description={firstUpperCase(description)}
        wind={{ speed, deg, gust }}
        humidity={humidity}
        pressure={pressure}
      />
    </div>
  );
};

ResultPanel.propTypes = {
  apiData: PropTypes.object.isRequired,
};

export default ResultPanel;
