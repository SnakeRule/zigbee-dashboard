import { IkeaDoorSensor } from "@/zigbee-devices/ikeaDoorSensor";
import { DoorClosed, DoorOpen } from "lucide-react";
import { SensorCard } from "../sensorCard/sensorCard";
import { SensorValues } from "../sensorCard/sensorValues/sensorValues";

type DoorSensorCardProps = {
  sensors: IkeaDoorSensor[];
};

const ICON_SIZE = 18;

function getDoorIcon(contact: IkeaDoorSensor["contact"]) {
  return contact ? (
    <DoorClosed size={ICON_SIZE} />
  ) : (
    <DoorOpen size={ICON_SIZE} />
  );
}

export function DoorSensorCard({ sensors }: DoorSensorCardProps) {
  return (
    <SensorCard title="Ovet">
      {sensors.map((sensor) => (
        <SensorValues
          name={sensor.friendlyName}
          key={sensor.ieeeAddress}
          ieeeAddress={sensor.ieeeAddress}
          values={[
            {
              icon: getDoorIcon(sensor.contact),
              value: sensor.contact ? "Kiinni" : "Auki",
            },
          ]}
        />
      ))}
    </SensorCard>
  );
}
