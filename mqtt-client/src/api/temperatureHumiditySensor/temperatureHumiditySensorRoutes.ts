import { FastifyInstance } from "fastify";
import getTemperatureHumiditySensorTemperature from "./values/temperature/get";
import getTemperatureHumiditySensorHumidity from "./values/humidity/get";

async function temperatureHumiditySensorRoutes(fastify: FastifyInstance) {
  fastify.register(getTemperatureHumiditySensorTemperature);
  fastify.register(getTemperatureHumiditySensorHumidity);
}

export default temperatureHumiditySensorRoutes;
