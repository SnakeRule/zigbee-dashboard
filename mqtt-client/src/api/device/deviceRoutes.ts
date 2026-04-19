import { FastifyInstance } from "fastify";
import renameDevice from "./name/patch";

async function deviceRoutes(fastify: FastifyInstance) {
  fastify.register(renameDevice);
}

export default deviceRoutes;
