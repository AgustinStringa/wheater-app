import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-rose-200 bg-rose-50/50 p-8 text-center shadow-sm">
      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100/70 text-rose-600">
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z M10 9v2m0 4h.01"
          />
        </svg>
      </div>
      <h3 className="text-base font-bold text-slate-800">
        Ciudad no encontrada
      </h3>
      <p className="mt-1 text-xs text-slate-500 max-w-xs">
        Lo sentimos, no encontramos resultados para tu búsqueda. Por favor verifica el nombre de la ciudad y el país seleccionado.
      </p>
    </div>
  );
};

export default NotFound;
