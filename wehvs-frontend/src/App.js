import "font-awesome/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routing from "./components/Router/Routing";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routing />
        <ToastContainer position="bottom-right" pauseOnHover />
      </div>
    </BrowserRouter>
  );
}

export default App;
