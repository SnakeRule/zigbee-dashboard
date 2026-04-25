import { MqttClient } from "mqtt";

export function changeDeviceName(
  client: MqttClient,
  oldName: string,
  newName: string,
) {
  client.publish(
    "zigbee2mqtt/bridge/request/device/rename",
    JSON.stringify({ from: oldName, to: newName }),
  );
}

export function publishPermitJoin(client: MqttClient, time: number) {
  client.publish(
    "zigbee2mqtt/bridge/request/permit_join",
    JSON.stringify({ time }),
  );
}
