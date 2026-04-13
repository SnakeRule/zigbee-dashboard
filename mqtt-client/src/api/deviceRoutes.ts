import { FastifyInstance } from "fastify";
import temperatureHumiditySensorRoutes from "./temperatureHumiditySensor/temperatureHumiditySensorRoutes";
import soilSensorRoutes from "./temperatureHumiditySensor/soilSensorRoutes";

async function deviceRoutes(fastify: FastifyInstance) {
  fastify.register(temperatureHumiditySensorRoutes, {
    prefix: "/th",
  });
  fastify.register(soilSensorRoutes, {
    prefix: "/soil",
  });
}

export default deviceRoutes;
