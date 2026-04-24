import { TemperatureHumiditySensor } from "@/zigbee-devices/temperatureHumiditySensor";
import { SensorCard } from "../sensorCard/sensorCard";
import { SensorValues } from "../sensorCard/sensorValues/sensorValues";
import { Droplet, Thermometer } from "lucide-react";

type TemperatureSensorCardProps = {
  sensors: TemperatureHumiditySensor[];
};

export function TemperatureSensorCard({ sensors }: TemperatureSensorCardProps) {
  return (
    <SensorCard title="Lämpömittarit">
      {sensors.map((sensor) => (
        <SensorValues
          key={sensor.ieeeAddress}
          name={sensor.friendlyName}
          ieeeAddress={sensor.ieeeAddress}
          values={[
            {
              icon: <Thermometer size={26} />,
              value: sensor.temperature?.toFixed(1) ?? "",
              unit: "°C",
              min: 10,
              max: 40,
            },
            {
              icon: <Droplet size={26} />,
              value: sensor.humidity?.toFixed(1) ?? "",
              unit: "%",
              min: 0,
              max: 100,
            },
          ]}
        />
      ))}
    </SensorCard>
  );
}
