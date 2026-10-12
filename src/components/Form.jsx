import React, { useState } from "react";
import PropTypes from "prop-types";
import arrayOptions from "../helpers/helper-form";

const Form = ({ setFormData, setConsultar, onLimpiar }) => {
  const [searchData, setSearchData] = useState({
    city: "",
    country: "",
  });
  const [error, setError] = useState(false);

  const { city, country } = searchData;

  const handleInputChange = (evt) => {
    setSearchData({
      ...searchData,
      [`${evt.target.name}`]: evt.target.value,
    });
  };

  const handleLimpiar = () => {
    setSearchData({ city: "", country: "" });
    setError(false);
    if (onLimpiar) {
      onLimpiar();
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!city.trim() || !country.trim()) {
      setError(true);
      return;
    }
    setError(false);
    setFormData({
      city: city.trim(),
      country,
    });
    setConsultar(true);
  };

  return (
    <div className="rounded-2xl border border-teal-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-[#00796b]">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Buscar Clima</h2>
            <p className="text-xs text-slate-500">
              Consulta el estado del tiempo en cualquier ciudad
            </p>
          </div>
        </div>

        {(city || country) && (
          <button
            type="button"
            onClick={handleLimpiar}
            className="cursor-pointer text-xs font-semibold text-teal-700 hover:text-teal-900 transition-colors"
          >
            Limpiar
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error ? (
          <div
            role="alert"
            className="alert alert-danger flex items-center gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs font-semibold text-rose-800 shadow-2xs"
          >
            <svg className="h-4 w-4 shrink-0 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Completa ambos campos para realizar una búsqueda</span>
          </div>
        ) : null}

        <div>
          <label
            htmlFor="input-city"
            className="mb-1.5 block text-xs font-semibold text-slate-700"
          >
            Ciudad
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-teal-600">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </span>
            <input
              type="text"
              name="city"
              id="input-city"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pr-4 pl-10 text-sm font-medium text-slate-800 transition-all outline-none placeholder:text-slate-400 focus:border-[#00796b] focus:bg-white focus:ring-4 focus:ring-teal-500/15"
              placeholder="Ej: Rosario"
              value={city}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="select-country"
            className="mb-1.5 block text-xs font-semibold text-slate-700"
          >
            País
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-teal-600">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <select
              name="country"
              id="select-country"
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pr-10 pl-10 text-sm font-medium text-slate-800 transition-all outline-none focus:border-[#00796b] focus:bg-white focus:ring-4 focus:ring-teal-500/15"
              value={country}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Seleccione un país
              </option>
              {arrayOptions.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.country}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="btn inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00796b] to-[#004d40] py-3.5 px-6 font-semibold text-white shadow-md shadow-teal-900/20 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-900/30 active:translate-y-0"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>BUSCAR CLIMA</span>
          </button>
        </div>
      </form>
    </div>
  );
};

Form.propTypes = {
  setFormData: PropTypes.func.isRequired,
  setConsultar: PropTypes.func.isRequired,
  onLimpiar: PropTypes.func,
};

export default Form;
