import estilo from "./HomeBtn.module.css";
import { Link } from "react-router-dom";

export function HomeBtn() {
  return (
    <div className={estilo.fundo}>
      <Link to="/inicial" className={estilo.homeBtn}>
        Home
      </Link>
    </div>
  );
}
