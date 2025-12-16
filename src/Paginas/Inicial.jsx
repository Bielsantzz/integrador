import { Cabecalho } from '../Componentes/Cabecalho';
import { Outlet } from 'react-router-dom';
import { Rodape } from '../Componentes/Rodape';
import { HomeBtn } from '../Componentes/HomeBtn';
import estilo from './Inicial.module.css';

export function Inicial() {
  return (
    <div className={estilo.layout}>
      <Cabecalho />

      <main className={estilo.corpo}>
        <Outlet />
      </main>
        <HomeBtn />
      <Rodape />
    </div>
  );
}
