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
          values={[
            {
              icon: <Thermometer size={20} />,
              value: `${sensor.temperature?.toFixed(1).toString()}°C`,
            },
            {
              icon: <Droplet size={20} />,
              value: `${sensor.humidity?.toFixed(1).toString()}%`,
            },
          ]}
        />
      ))}
    </SensorCard>
  );
}
