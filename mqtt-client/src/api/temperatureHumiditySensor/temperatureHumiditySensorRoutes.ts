import { FastifyInstance } from "fastify";
import getTemperatureHumiditySensorTemperature from "./values/get";

async function temperatureHumiditySensorRoutes(fastify: FastifyInstance) {
  fastify.register(getTemperatureHumiditySensorTemperature);
}

export default temperatureHumiditySensorRoutes;
