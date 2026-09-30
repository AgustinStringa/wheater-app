import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import ResultPanel from './components/ResultPanel';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import { weatherService, CityNotFoundError } from './services';

function App() {
  const [formData, setFormData] = useState({
    city: '',
    country: '',
  });
  const [consultar, setConsultar] = useState(false);
  const [apiData, setApiData] = useState(null);
  const { city, country } = formData;
  const [loading, setLoading] = useState(false);
  const [errorSearch, setErrorSearch] = useState(false);

  useEffect(() => {
    if (!consultar) return;

    const controller = new AbortController();

    const fetchWeather = async () => {
      setLoading(true);
      setErrorSearch(false);

      try {
        const data = await weatherService.getWeatherByCity(city, country, {
          signal: controller.signal,
        });
        setApiData(data);
        setErrorSearch(false);
      } catch (error) {
        if (error.name === 'AbortError') return;

        if (error instanceof CityNotFoundError) {
          setErrorSearch(true);
        } else {
          console.error('Error al consultar el clima:', error.message);
          setErrorSearch(true);
        }
        setApiData(null);
      } finally {
        setLoading(false);
        setConsultar(false);
      }
    };

    fetchWeather();

    return () => {
      controller.abort();
    };
  }, [consultar, city, country]);

  return (
    <>
      <div className="main-grid">
        <Header></Header>
        <main>
          <div className="contenedor-form">
            <div className="container">
              <div className="row">
                <div className="col m6 s12">
                  <Form setFormData={setFormData} setConsultar={setConsultar}></Form>
                </div>
                {/*collumn 1*/}
                <div className="col m6 s12">
                  {apiData && !loading ? <ResultPanel apiData={apiData}></ResultPanel> : null}
                  {errorSearch && !loading ? <NotFound></NotFound> : null}
                </div>
                {/*collumn 2*/}
              </div>
            </div>
          </div>
        </main>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
