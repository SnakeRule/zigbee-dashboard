import { FastifyInstance } from "fastify";
import getSoilSensorHumidity from "../soilSensor/values/humidity/get";
import getSoilSensorMoisture from "../soilSensor/values/moisture/get";
import getSoilSensorTemperature from "../soilSensor/values/temperature/get";
import getSoilSensorIlluminance from "../soilSensor/values/illuminance/get";

async function soilSensorRoutes(fastify: FastifyInstance) {
  fastify.register(getSoilSensorHumidity);
  fastify.register(getSoilSensorIlluminance);
  fastify.register(getSoilSensorMoisture);
  fastify.register(getSoilSensorTemperature);
}

export default soilSensorRoutes;
