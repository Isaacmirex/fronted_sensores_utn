import { Sidebar2 } from "./components";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/Routes";
import "./App.css";

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
