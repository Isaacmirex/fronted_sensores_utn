import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "./logo3.svg";
import "./styles.css";

const navItems = [
  { name: "home", title: "inicio", path: "/Home" },
  { name: "person_add", title: "Paciente", path: "/Paciente" },
  { name: "Inventory", title: "Encuesta EPP", path: "/Encuesta" },
  { name: "cardiology", title: "Signos Vitales", path: "/SignosVitales" },
  { name: "Person_Celebrate", title: "Estrés", path: "/Estres" },
  { name: "Data_loss_Prevention", title: "Resultados por paciente", path: "/ResultadosPaciente" },
  { name: "Data_Usage", title: "Resultados globales", path: "/ResultadosGlobales" },
  { name: "book_4", title: "Manual de usuario", path: "/ManualUsuario" },
  { name: "Warning", title: "Reportar un fallo", path: "/ReportarFallo" },
  { name: "Hail", title: "Autor Isaac Romero", path: "/Autor" },
  { name: "logout", title: "Cerrar sesión", path: "/Logout" }
];

export const Sidebar2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleClick = (path) => {
    console.log("Ruta actual:", path);
    window.history.pushState(null, "", path);
    window.location.reload();
  };

  return (
    <section className="page sidebar-2-page">
      <aside className={`sidebar-2 ${isOpen ? "open" : ""}`}>
        <div className="inner">
          <header>
            <button
              type="button"
              className="sidebar-2-burger"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="material-symbols-outlined">
                {isOpen ? "close" : "menu"}
              </span>
            </button>
            <img src={logo} style={{ width: "200px", height: "auto" }} alt="Logo" />
          </header>
          <nav>
            {navItems.map((item) => (
              <Link
                to={item.path}
                key={item.name}
                className={`sidebar-link ${location.pathname === item.path ? "active" : ""}`}
                onClick={() => handleClick(item.path)}
              >
                <button type="button" className="sidebar-button">
                  <span className="material-symbols-outlined">{item.name}</span>
                  <p>{item.title}</p>
                </button>
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </section>
  );
};