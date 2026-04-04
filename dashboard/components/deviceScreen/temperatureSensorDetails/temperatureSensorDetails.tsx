import { Text } from "@/components/text/text";
import { TemperatureHumiditySensor } from "@/zigbee-devices/temperatureHumiditySensor";

type TemperatureSensorDetailsProps = { sensor: TemperatureHumiditySensor };

export default function TemperatureSensorDetails({
  sensor,
}: TemperatureSensorDetailsProps) {
  return (
    <div>
      <Text tag="p" variant="text-regular">
        {sensor.friendlyName}
      </Text>
      <Text tag="p" variant="text-regular">
        {sensor.temperature}
      </Text>
      <Text tag="p" variant="text-regular">
        {sensor.humidity}
      </Text>
      <Text tag="p" variant="text-regular">
        {sensor.battery}
      </Text>
    </div>
  );
}
