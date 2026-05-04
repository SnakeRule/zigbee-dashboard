import { Modal } from "../modal/modal";
import { Text } from "../text/text";
import { WeatherForecast } from "./weatherForecast/weatherForecast";
import styles from "./weatherModal.module.css";

type WeatherModalProps = {
  hideModal: () => void;
  modalVisible: boolean;
};

export function WeatherModal({ hideModal, modalVisible }: WeatherModalProps) {
  return (
    <Modal hideModal={hideModal} modalVisible={modalVisible}>
      <div className={styles["weather-modal-container"]}>
        <Text variant="text-xl" tag="h1" className="">
          {"Säätiedot"}
        </Text>
        <Text variant="text-large" tag="h3">
          {"Tunneittain"}
        </Text>
        <WeatherForecast />
      </div>
    </Modal>
  );
}
