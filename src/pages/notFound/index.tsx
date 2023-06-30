import styles from "./notFound.module.css";
import { Link } from "react-router-dom";

export function NotFound() {
   return (
      <div className={styles.container}>
         <h1>ERRO 404 - PAGINA NÃO ENCONTRADA</h1>
         <Link to="/">Acessar Cripto moedas</Link>
      </div>
   );
}
