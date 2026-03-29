import { PlantSoilSensor } from "@/zigbee-devices/plantSoilSensor";
import { Thermometer, Droplet, Sun, Flower2 } from "lucide-react";
import { SensorCard } from "../sensorCard/sensorCard";
import { SensorValues } from "../sensorCard/sensorValues/sensorValues";

type PlantSoilCardProps = {
  sensors: PlantSoilSensor[];
};

export function PlantSoilSensorCard({ sensors }: PlantSoilCardProps) {
  return (
    <SensorCard title="Kasvit">
      {sensors.map((sensor) => (
        <SensorValues
          key={sensor.ieeeAddress}
          name={sensor.friendlyName}
          values={[
            {
              icon: <Flower2 size={20} />,
              value: `${sensor.soil_moisture?.toFixed(1).toString()}%`,
            },
            {
              icon: <Sun size={20} />,
              value: `${sensor.illuminance?.toString()}lx`,
            },
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
