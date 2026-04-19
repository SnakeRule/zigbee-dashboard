import {
  FastifyPluginAsyncTypebox,
  TypeBoxTypeProvider,
} from "@fastify/type-provider-typebox";
import { RenameDeviceRoute } from "../../deviceSchemas";
import { changeDeviceName } from "../../../mqttClient/publish";

const renameDevice: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.withTypeProvider<TypeBoxTypeProvider>().patch(
    "/name/:friendlyName",
    {
      schema: RenameDeviceRoute,
    },
    async (request, reply) => {
      if (!fastify.mqttClient) {
        console.error("No Mqtt client defined!");
        return reply.status(500).send({ error: "No MQTT client defined!" });
      }
      changeDeviceName(
        fastify.mqttClient,
        request.params.friendlyName,
        request.body.name,
      );
      return reply.status(200).send({ friendlyName: request.body.name });
    },
  );
};

export default renameDevice;
