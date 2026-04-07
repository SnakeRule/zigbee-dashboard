import { FastifyInstance } from "fastify";
import dbRoutes from "./dbRoutes";

async function v1Routes(fastify: FastifyInstance) {
  fastify.register(dbRoutes, { prefix: "/db" });
}

export default v1Routes;
