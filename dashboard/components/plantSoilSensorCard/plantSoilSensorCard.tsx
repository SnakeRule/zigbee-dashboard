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
          ieeeAddress={sensor.ieeeAddress}
          values={[
            {
              icon: <Flower2 size={26} />,
              value: `${sensor.soil_moisture?.toFixed(1).toString()}%`,
              unit: "%",
              min: 0,
              max: 100,
            },
            {
              icon: <Sun size={26} />,
              value: "10000",
              unit: "lx",
              min: 0,
              max: 10000,
            },
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
