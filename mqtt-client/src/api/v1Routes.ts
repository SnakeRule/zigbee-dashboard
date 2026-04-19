import { FastifyInstance } from "fastify";
import zigbeeRoutes from "./zigbeeRoutes";

async function v1Routes(fastify: FastifyInstance) {
  fastify.register(zigbeeRoutes, { prefix: "/zigbee" });
}

export default v1Routes;
