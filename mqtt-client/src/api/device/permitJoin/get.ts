import {
  FastifyPluginAsyncTypebox,
  TypeBoxTypeProvider,
} from "@fastify/type-provider-typebox";
import { PermitJoinRoute } from "../../deviceSchemas";
import { publishPermitJoin } from "../../../mqttClient/publish";

const permitJoin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.withTypeProvider<TypeBoxTypeProvider>().get(
    "/permit-join",
    {
      schema: PermitJoinRoute,
    },
    async (request, reply) => {
      if (!fastify.mqttClient) {
        console.error("No Mqtt client defined!");
        return reply.status(500).send({ error: "No MQTT client defined!" });
      }
      publishPermitJoin(fastify.mqttClient, request.query.time);
      return reply.status(200).send({ ok: true });
    },
  );
};

export default permitJoin;
