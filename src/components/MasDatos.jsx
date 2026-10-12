import React, { useState } from "react";
import PropTypes from "prop-types";

const MasDatos = ({
  feels_like,
  main,
  description,
  wind = {},
  humidity,
  pressure,
}) => {
  const { speed, deg, gust } = wind || {};
  const [abierto, setAbierto] = useState(false);

  return (
    <div className="mt-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              Detalles Meteorológicos
            </h3>
            <p className="text-xs text-slate-500">Condiciones atmosféricas</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setAbierto(!abierto)}
          className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700"
        >
          <span>{abierto ? "Ocultar" : "Ver más"}</span>
          <svg
            className={`h-4 w-4 transition-transform duration-200 ${abierto ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Grid de métricas clave */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Sensación térmica
          </span>
          <p className="mt-1 text-lg font-extrabold text-slate-800">
            {feels_like}°C
          </p>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Humedad
          </span>
          <p className="mt-1 text-lg font-extrabold text-slate-800">
            {humidity}%
          </p>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Presión
          </span>
          <p className="mt-1 text-lg font-extrabold text-slate-800">
            {pressure} hPa
          </p>
        </div>
      </div>

      {/* Sección expandible para viento y detalles */}
      {abierto && (
        <div className="mt-3 space-y-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3.5 text-xs">
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
            <span className="font-semibold text-slate-600">Estado general:</span>
            <span className="font-bold text-slate-800">{main} &bull; "{description}"</span>
          </div>

          <div className="space-y-1">
            <span className="font-semibold text-slate-600">Viento:</span>
            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="rounded-lg bg-white p-2 border border-slate-200/60">
                <span className="block text-[10px] text-slate-400">Velocidad</span>
                <span className="font-bold text-slate-800">{speed ?? "-"} m/s</span>
              </div>
              <div className="rounded-lg bg-white p-2 border border-slate-200/60">
                <span className="block text-[10px] text-slate-400">Dirección</span>
                <span className="font-bold text-slate-800">{deg ?? "-"}°</span>
              </div>
              <div className="rounded-lg bg-white p-2 border border-slate-200/60">
                <span className="block text-[10px] text-slate-400">Ráfaga</span>
                <span className="font-bold text-slate-800">{gust ?? "-"} m/s</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

MasDatos.propTypes = {
  feels_like: PropTypes.number,
  main: PropTypes.string,
  description: PropTypes.string,
  wind: PropTypes.object,
  humidity: PropTypes.number,
  pressure: PropTypes.number,
};

export default MasDatos;
