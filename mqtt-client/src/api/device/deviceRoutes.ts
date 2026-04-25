import { FastifyInstance } from "fastify";
import renameDevice from "./name/patch";
import permitJoin from "./permitJoin/get";

async function deviceRoutes(fastify: FastifyInstance) {
  fastify.register(renameDevice);
  fastify.register(permitJoin);
}

export default deviceRoutes;
