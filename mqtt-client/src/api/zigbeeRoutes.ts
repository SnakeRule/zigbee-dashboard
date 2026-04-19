import { FastifyInstance } from "fastify";
import temperatureHumiditySensorRoutes from "./temperatureHumiditySensor/temperatureHumiditySensorRoutes";
import soilSensorRoutes from "./soilSensor/soilSensorRoutes";
import deviceRoutes from "./device/deviceRoutes";

async function zigbeeRoutes(fastify: FastifyInstance) {
  fastify.register(temperatureHumiditySensorRoutes, {
    prefix: "/th",
  });
  fastify.register(soilSensorRoutes, {
    prefix: "/soil",
  });
  fastify.register(deviceRoutes, {
    prefix: "/device",
  });
}

export default zigbeeRoutes;
