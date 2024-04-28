import { Sidebar2 } from "./components";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/Routes";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Router>
        <Sidebar2 />
        <Routes />
      </Router>
    </div>
  );
}

export default App;
