import Header from "./components/Header";
import Form from "./components/Form";
import ResultPanel from "./components/ResultPanel";
import React, { useState } from 'react';


function App() {
  const [formData, setFormData] = useState({
    city: '',
    country: '',
    textCountry: '',
  })
  const { city, country, textCountry } = formData;

  const [apiData, setApiData] = useState(null);
  return (
    <>
      <Header></Header>
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Form setFormData={setFormData}></Form>
            </div>
            {/*collumn 1*/}
            <div className="col m6 s12">
              {city && country && textCountry ? <ResultPanel city={city} textCountry={textCountry}></ResultPanel> : null}

            </div>
            {/*collumn 2*/}
          </div>
        </div>
      </div>

    </>
  );
}

export default App;
