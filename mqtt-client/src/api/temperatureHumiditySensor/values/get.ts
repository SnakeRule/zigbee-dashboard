import { FastifyInstance } from "fastify";
import { DateTime } from "luxon";
import { temperatureQuery } from "../../../sqlite/queries/temperatureSensor/temperatureQuery";
import { getSqLiteTimeFormat } from "../../../utils/sqLiteUtils";

interface IParams {
  ieeeAddress: string;
  from: string;
  to: string;
}

interface IReply {
  200: { value: number; created_at: string }[];
  400: { error: string };
}

interface IRoute {
  Params: IParams;
  Reply: IReply;
}

async function getTemperatureHumiditySensorTemperature(
  fastify: FastifyInstance,
) {
  fastify.get<IRoute>(
    "/values/:ieeeAddress/temperature/:from/:to",
    async (request, reply) => {
      const from = DateTime.fromISO(request.params.from).toUTC();
      const to = DateTime.fromISO(request.params.to).toUTC();

      if (!from.isValid || !to.isValid) {
        return reply.code(400).send({ error: "Invalid date format" });
      }

      const ieeeAddress = request.params.ieeeAddress;
      const values = temperatureQuery(
        fastify.db,
        ieeeAddress,
        getSqLiteTimeFormat(from),
        getSqLiteTimeFormat(to),
      );
      return reply.code(200).send(values);
    },
  );
}

export default getTemperatureHumiditySensorTemperature;
