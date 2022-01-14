import React from "react";

const NotFound = () => {
  return (
    <div className="center-align card-panel">
      <p className="p-not-found">
        Lo sentimos, no encontramos resultados para tu busqueda
        <br />
        <i className="material-icons icon-not-found">sentiment_dissatisfied</i>
      </p>
    </div>
  );
};

export default NotFound;
