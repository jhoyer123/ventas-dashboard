import { ShoppingCart } from "lucide-react";
import styles from "./styles.module.css";

interface Props {
  isOpenShopping: boolean;
  setIsOpenShopping: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ButtonShopping = ({
  setIsOpenShopping,
  isOpenShopping,
}: Props) => {
  if (isOpenShopping) return null;
  return (
    <button
      className={`${styles.btnOpenCartMobile} font-body gap-5`}
      onClick={() => setIsOpenShopping(!isOpenShopping)}
    >
      <ShoppingCart size={24} />
      <span>Abrir carrito</span>
    </button>
  );
};
