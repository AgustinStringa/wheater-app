import Header from "./components/Header";
import Form from "./components/Form";


function App() {
  return (
    <>
      <Header></Header>
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Form></Form>
            </div>
            {/*collumn 1*/}
            <div className="col m6 s12"></div>
            {/*collumn 2*/}
          </div>
        </div>
      </div>

    </>
  );
}

export default App;
