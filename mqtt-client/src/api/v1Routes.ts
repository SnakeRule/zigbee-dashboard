import { FastifyInstance } from "fastify";
import deviceRoutes from "./deviceRoutes";

async function v1Routes(fastify: FastifyInstance) {
  fastify.register(deviceRoutes, { prefix: "/device" });
}

export default v1Routes;
