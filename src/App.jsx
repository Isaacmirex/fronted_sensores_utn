import { Sidebar2 } from "./components";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/Routes";
import "./App.css";
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';



function App() {
  return (
    <Router>
      <div className="app">
        <div className="nav">
          <Sidebar2 />
        </div>
        <div className="content">
          <Routes />
        </div>
      </div>
    </Router>
  );
}

export default App;
