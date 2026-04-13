import Type from "typebox";

const DeviceQueryQueryString = Type.Object({
  count: Type.Optional(Type.Integer()),
});

const DeviceParams = Type.Object({
  ieeeAddress: Type.String(),
  from: Type.String({ format: "date-time" }),
  to: Type.String({ format: "date-time" }),
});

export const DeviceQueryRoute = {
  params: DeviceParams,
  response: {
    200: Type.Array(
      Type.Object({ value: Type.Number(), created_at: Type.String() }),
    ),
    400: Type.Object({
      statusCode: Type.Integer(),
      code: Type.String(),
      error: Type.String(),
      message: Type.String(),
    }),
  },
  querystring: DeviceQueryQueryString,
};
