import { Link } from "react-router-dom";
import estilo from './Menu.module.css';

export function Menu() {
  return (
    <nav className={estilo.menuGrid}>
      <Link to='/inicial' className={estilo.menuItem}>Home</Link>
      <Link to='/inicial/ambientes' className={estilo.menuItem}>Ambientes</Link>
      <Link to='/inicial/sensores' className={estilo.menuItem}>Sensores</Link>
      <Link to='/inicial/historico' className={estilo.menuItem}>Histórico</Link>
    </nav>
  );
}