import { useState } from "react";
import logo from "./logo3.svg";
import "./styles.css";

const navItems = [
  { name: "home", title: "inicio" },
  { name: "person_add", title: "Paciente" },
  { name: "Inventory", title: "Encuesta EPP" },
  { name: "cardiology", title: "Signos Vitales" },
  { name: "Person_Celebrate", title: "Estrés" },
  { name: "Data_loss_Prevention", title: "Resultados por paciente" },
  { name: "Data_Usage", title: "Resultados globales" },
  { name: "book_4", title: "Manual de usuario" },
  { name: "Warning", title: "Reportar un fallo" },
  { name: "Hail", title: "Autor Isaac Romero" },
  { name: "logout", title: "Cerrar sesión" }
];

export const Sidebar2 = () => {
  const [isOpen, setIsOpen] = useState(false);
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
            <img src={logo} style={{ width: "200px", height: "auto" }} />
          </header>
          <nav>
            {navItems.map((item) => (
              <button key={item.name} type="button">
                <span className="material-symbols-outlined">{item.name}</span>
                <p>{item.title}</p>
              </button>
            ))}
            {/* <div>
            <small>Desarrollado por Isaac Romero</small>
            </div> */}
          </nav>
        </div>
      </aside>
    </section>
  );
};
