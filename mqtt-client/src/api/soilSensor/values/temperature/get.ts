import { DateTime } from "luxon";
import {
  DEFAULT_SAMPLE_COUNT,
  getSqLiteTimeFormat,
  MAX_SAMPLE_COUNT,
} from "../../../../utils/sqLiteUtils";
import { sensorValueQuery } from "../../../../sqlite/queries/sensorValuesQuery";
import { SENSOR_PARAMETER } from "../../../../types/sqLite";
import { DeviceQueryRoute } from "../../../deviceSchemas";
import {
  FastifyPluginAsyncTypebox,
  TypeBoxTypeProvider,
} from "@fastify/type-provider-typebox";
import { invalidDataError } from "../../../errors";

const getSoilSensorTemperature: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .get(
      "/temperature/:ieeeAddress/:from/:to",
      { schema: DeviceQueryRoute },
      async (request, reply) => {
        const count = request.query.count
          ? Number(request.query.count)
          : DEFAULT_SAMPLE_COUNT;
        if (!Number.isInteger(count) || count <= 0) {
          return reply
            .code(400)
            .send(invalidDataError({ message: "Invalid sample count given!" }));
        }

        const from = DateTime.fromISO(request.params.from).toUTC();
        const to = DateTime.fromISO(request.params.to).toUTC();

        if (!from.isValid || !to.isValid) {
          return reply
            .code(400)
            .send(invalidDataError({ message: "Invalid date format" }));
        }

        const ieeeAddress = request.params.ieeeAddress;

        const values = sensorValueQuery(
          fastify.db,
          SENSOR_PARAMETER.TEMPERATURE,
          ieeeAddress,
          getSqLiteTimeFormat(from),
          getSqLiteTimeFormat(to),
          count > MAX_SAMPLE_COUNT ? MAX_SAMPLE_COUNT : count,
        );

        return reply.code(200).send(values);
      },
    );
};

export default getSoilSensorTemperature;
