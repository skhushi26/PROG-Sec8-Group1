import 'font-awesome/css/font-awesome.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routing from "./components/Router/Routing";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routing />
      </div>
    </BrowserRouter>
  );
}

export default App;
