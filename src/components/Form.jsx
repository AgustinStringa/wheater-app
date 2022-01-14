import React, { useState } from "react";

const Form = ({ setFormData, setConsultar }) => {
  const [searchData, setSearchData] = useState({
    city: "",
    country: "",
  });
  const [error, setError] = useState(false);

  const { city, country } = searchData;

  const handleInputChange = (evt) => {
    setSearchData({
      ...searchData,
      [`${evt.target.name}`]: `${evt.target.value}`,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!city.trim() || !country.trim()) {
      setError(true);
      return;
    }
    setError(false);
    setFormData({
      city,
      country,
    });
    setConsultar(true);
  };
  return (
    <form onSubmit={handleSubmit}>
      {error ? (
        <p className="alert alert-danger">
          Completa ambos campos para realizar una búsqueda
        </p>
      ) : null}
      <div className="input-field col s12">
        <i className="material-icons prefix">apartment</i>
        <input
          type="text"
          name="city"
          id="input-city"
          value={city}
          onChange={handleInputChange}
        />
        <label htmlFor="input-city">City</label>
      </div>
      <div className="input-field col s12">
        <i className="material-icons prefix flag">flag</i>

        <select
          name="country"
          id="select-country"
          value={country}
          onChange={handleInputChange}
        >
          <option value="" disabled>
            --Seleccione un país--
          </option>
          <option value="US">Estados Unidos</option>
          <option value="MX">México</option>
          <option value="AR">Argentina</option>
          <option value="CO">Colombia</option>
          <option value="CR">Costa Rica</option>
          <option value="ES">España</option>
          <option value="PE">Perú</option>
        </select>
        <label htmlFor="select-country">Country</label>
      </div>

      <div className="input-field col s12" style={{ textAlign: "right" }}>
        <button type="submit" className="btn waves-effect waves-light">
          BUSCAR CLIMA
          <i className="material-icons right">send</i>
        </button>
      </div>
    </form>
  );
};

export default Form;
