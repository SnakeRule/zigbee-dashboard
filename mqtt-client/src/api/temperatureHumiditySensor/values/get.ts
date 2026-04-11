import { FastifyInstance } from "fastify";
import { DateTime } from "luxon";
import { getSqLiteTimeFormat } from "../../../utils/sqLiteUtils";
import { sensorValueQuery } from "../../../sqlite/queries/sensorValuesQuery";
import { SENSOR_PARAMETER } from "../../../types/sqLite";

interface IParams {
  ieeeAddress: string;
  from: string;
  to: string;
}

interface IReply {
  200: { value: number; created_at: string }[];
  400: { error: string };
}

interface IQuerystring {
  count?: string;
}

interface IRoute {
  Params: IParams;
  Reply: IReply;
  Querystring: IQuerystring;
}

async function getTemperatureHumiditySensorTemperature(
  fastify: FastifyInstance,
) {
  fastify.get<IRoute>(
    "/temperature/:ieeeAddress/:from/:to",
    async (request, reply) => {
      const count = Number(request.query.count);
      if (!Number.isInteger(count) || count <= 0) {
        return reply.code(400).send({ error: "Invalid count" });
      }

      const from = DateTime.fromISO(request.params.from).toUTC();
      const to = DateTime.fromISO(request.params.to).toUTC();

      if (!from.isValid || !to.isValid) {
        return reply.code(400).send({ error: "Invalid date format" });
      }

      const ieeeAddress = request.params.ieeeAddress;

      const values = sensorValueQuery(
        fastify.db,
        SENSOR_PARAMETER.TEMPERATURE,
        ieeeAddress,
        getSqLiteTimeFormat(from),
        getSqLiteTimeFormat(to),
        count,
      );

      return reply.code(200).send(values);
    },
  );
}

export default getTemperatureHumiditySensorTemperature;
