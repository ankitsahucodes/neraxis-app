import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Homepage from "./pages/Homepage";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <h1 className="text-center border border-4 py-3 fw-bold">
        Neraxis CRM Dashboard
      </h1>

      <div className="container">
        <div className="row">
          <Sidebar />

          <div className="col-12 col-md-10 mx-auto mt-3">
            <Homepage />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
