import { FastifyInstance } from "fastify";
import getSoilSensorHumidity from "./values/humidity/get";
import getSoilSensorMoisture from "./values/moisture/get";
import getSoilSensorTemperature from "./values/temperature/get";
import getSoilSensorIlluminance from "./values/illuminance/get";

async function soilSensorRoutes(fastify: FastifyInstance) {
  fastify.register(getSoilSensorHumidity);
  fastify.register(getSoilSensorIlluminance);
  fastify.register(getSoilSensorMoisture);
  fastify.register(getSoilSensorTemperature);
}

export default soilSensorRoutes;
