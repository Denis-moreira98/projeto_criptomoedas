import { Link } from "react-router-dom";
import styles from "./header.module.css";

import LogoImg from "../../assets/logo.svg";

export function Header() {
   return (
      <header className={styles.container}>
         <div className={styles.logo}>
            <Link to="/" />
            <img src={LogoImg} alt="Logo Cripto" />
         </div>
      </header>
   );
}
