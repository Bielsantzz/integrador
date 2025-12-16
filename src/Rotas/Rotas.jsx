import { Routes, Route } from "react-router-dom";
import { Login } from "../Paginas/Login";
import { Inicial } from "../Paginas/Inicial";
import { Ambientes } from "../Paginas/Ambientes";
import { Sensores } from "../Paginas/Sensores";
import { Historico } from "../Paginas/Historico";
import { Menu } from "../Componentes/Menu"; 
export function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/inicial" element={<Inicial />}>
        <Route index element={<Menu />} /> 
        <Route path="ambientes" element={<Ambientes />} />
        <Route path="sensores" element={<Sensores />} />
        <Route path="historico" element={<Historico />} />
      </Route>
    </Routes>
  );
}
