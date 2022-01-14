import Header from "./components/Header";
import Form from "./components/Form";
import ResultPanel from "./components/ResultPanel";
import React, { useState, useEffect } from 'react';


function App() {
  const API_KEY = '34a3fc29cd6b6907386c6dcad346f7e4';
  const [formData, setFormData] = useState({
    city: '',
    country: '',
  })
  const [consultar, setConsultar] = useState(false);
  const [apiData, setApiData] = useState(null);
  const { city, country } = formData;
  const [loading, setLoading] = useState(false);
  const [errorSearch, setErrorSearch] = useState(false);

  useEffect(() => {
    const consultarApi = async () => {
      const URL_BASE = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`;
      const response = await fetch(URL_BASE, {
        method: 'GET',
        mode: 'cors',
        Accept: "application/json",
      });
      const data = await response.json();
      if (data.cod === '404') {
        setErrorSearch(true);
        return;
      }
      console.log(data);
      setErrorSearch(false);
      const { name, main: { temp, temp_max, temp_min, feels_like, humidity, pressure }, weather: [{ main, description, icon }], wind: { speed, deg, gust } } = data;
      setApiData({
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
        pressure
      })
    }
    if (consultar) {
      setLoading(true);
      consultarApi();
      setTimeout(() => {
        setLoading(false);
      }, 2000)
    }
  }, [consultar, city, country])
  return (
    <>
      <Header></Header>
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Form setFormData={setFormData} setConsultar={setConsultar}></Form>
            </div>
            {/*collumn 1*/}
            <div className="col m6 s12">
              {apiData && !loading ? <ResultPanel apiData={apiData}></ResultPanel> : null}
              {errorSearch ? <p>No encontrado</p> : null}
            </div>
            {/*collumn 2*/}
          </div>
        </div>
      </div>

    </>
  );
}

export default App;
