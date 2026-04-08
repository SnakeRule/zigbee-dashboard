import { FastifyInstance } from "fastify";
import temperatureHumiditySensorRoutes from "./temperatureHumiditySensor/temperatureHumiditySensorRoutes";

async function deviceRoutes(fastify: FastifyInstance) {
  fastify.register(temperatureHumiditySensorRoutes, {
    prefix: "/th",
  });
}

export default deviceRoutes;
