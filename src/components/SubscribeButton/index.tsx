import { Product } from "../../pages";
import styles from "./styles.module.scss";

export function SubscribeButton({ priceId }: Product) {
  return (
    <button type="button" className={styles.subScribeButton}>
      Subscribe now
    </button>
  );
}
