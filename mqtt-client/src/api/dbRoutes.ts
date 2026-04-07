import { FastifyInstance } from "fastify";
import temperatureHumiditySensorRoutes from "./temperatureHumiditySensor/temperatureHumiditySensorRoutes";

async function dbRoutes(fastify: FastifyInstance) {
  fastify.register(temperatureHumiditySensorRoutes, {
    prefix: "/temperature-humidity",
  });
}

export default dbRoutes;
