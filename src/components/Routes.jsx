import React from "react";
import { Switch, Route } from "react-router-dom";
import HOME from "./Home/Home";
import PACIENTE from "./Paciente/Paciente";
import ENCUESTA from "./Encuesta/Encuesta";
import SIGNOSVITALES from "./SignosVitales/SignosVitales";
import ESTRES from "./Estres/Estres";
import RESULTADOSPACIENTE from "./ResultadosPaciente/ResultadosPaciente";
import RESULTADOSGLOBALES from "./ResultadosGlobales/ResultadosGlobales";
import MANUALUSUARIO from "./ManualUsuario/ManualUsuario";
import REPORTARFALLO from "./ReportarFallo/ReportarFallo";
import AUTOR from "./Autor/Autor";
import LOGOUT from "./Logout/Logout";

const Routes = () => {
  return (
    <Switch>
      <Route path="/Home" component={HOME} />
      <Route path="/Paciente" component={PACIENTE} />
      <Route path="/Encuesta" component={ENCUESTA} />
      <Route path="/SignosVitales" component={SIGNOSVITALES} />
      <Route path="/Estres" component={ESTRES} />
      <Route path="/ResultadosPaciente" component={RESULTADOSPACIENTE} />
      <Route path="/ResultadosGlobales" component={RESULTADOSGLOBALES} />
      <Route path="/ManualUsuario" component={MANUALUSUARIO} />
      <Route path="/ReportarFallo" component={REPORTARFALLO} />
      <Route path="/Autor" component={AUTOR} />
      <Route path="/Logout" component={LOGOUT} />
    </Switch>
  );
};

export default Routes;
