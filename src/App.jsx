import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import ResultPanel from "./components/ResultPanel";
import NotFound from "./components/NotFound";
import { Header, Footer, Spinner } from "../shared";
import { weatherService, CityNotFoundError } from "./services";

const navLinks = [
  { label: "Inicio", href: "#!", active: true },
];

const footerLinks = [
  { label: "Documentación API", href: "https://openweathermap.org/api", target: "_blank" },
  { label: "Curso React - Código con Juan", href: "https://codigoconjuan.com/", target: "_blank" },
];

function App() {
  const [formData, setFormData] = useState({
    city: "",
    country: "",
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
        if (error.name === "AbortError") return;

        if (error instanceof CityNotFoundError) {
          setErrorSearch(true);
        } else {
          console.error("Error al consultar el clima:", error.message);
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

  const handleLimpiarValores = () => {
    setFormData({ city: "", country: "" });
    setApiData(null);
    setErrorSearch(false);
  };

  return (
    <div className="flex min-h-dvh flex-col bg-teal-50/20 text-slate-800">
      <Header
        title="React Weather App"
        theme="weather"
        navLinks={navLinks}
      />

      <div className="min-h-full w-full flex-1 px-4 py-8">
        <main className="mx-auto w-full max-w-5xl">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            {/* Columna Izquierda: Formulario de Búsqueda */}
            <div className="lg:col-span-5">
              <Form
                setFormData={setFormData}
                setConsultar={setConsultar}
                onLimpiar={handleLimpiarValores}
              />
            </div>

            {/* Columna Derecha: Panel de Resultados o Estados */}
            <div className="lg:col-span-7">
              {loading && (
                <div className="my-12 flex justify-center">
                  <Spinner variant="chase" color="#00796b" text="Consultando pronóstico del clima..." />
                </div>
              )}

              {apiData && !loading ? (
                <ResultPanel apiData={apiData} />
              ) : null}

              {errorSearch && !loading ? (
                <NotFound />
              ) : null}

              {!apiData && !errorSearch && !loading && (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-teal-200 bg-white/70 p-12 text-center shadow-xs">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-2xl">
                    ⛅
                  </div>
                  <h3 className="text-base font-bold text-slate-700">
                    Elige una ciudad y un país
                  </h3>
                  <p className="mt-1 max-w-xs text-xs text-slate-500">
                    El pronóstico meteorológico detallado aparecerá aquí una vez realizada la búsqueda.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <Footer
        title="React Weather App"
        description="Aplicación de consulta de clima realizada utilizando la API de OpenWeatherMap."
        theme="weather"
        links={footerLinks}
      />
    </div>
  );
}

export default App;
