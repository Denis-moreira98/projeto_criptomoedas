import { ImSpinner3 } from "react-icons/im";
import styles from "./loading.module.css";

export function Loading() {
   return (
      <div className={styles.div_spinner}>
         <ImSpinner3 size={28} color="#30beff" />
      </div>
   );
}
