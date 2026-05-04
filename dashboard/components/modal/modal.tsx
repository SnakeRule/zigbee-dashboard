import { ReactNode } from "react";
import styles from "./modal.module.css";
import { X } from "lucide-react";
import { Button } from "../button/button";

type ModalProps = {
  modalVisible: boolean;
  hideModal: () => void;
  children: ReactNode;
};

export function Modal({ hideModal, modalVisible, children }: ModalProps) {
  return (
    modalVisible && (
      <div className={styles["modal-background"]} onClick={hideModal}>
        <section
          className={styles["modal-container"]}
          onClick={(event) => event.stopPropagation()}
        >
          <Button className={styles["modal-close-button"]} onClick={hideModal}>
            <X />
          </Button>
          {children}
        </section>
      </div>
    )
  );
}
