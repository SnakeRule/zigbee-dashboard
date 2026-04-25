import Type from "typebox";

// DEVICE DATA QUERY

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

// RENAME DEVICE

const RenameDeviceBody = Type.Object({
  name: Type.String(),
});

const RenameDeviceParams = Type.Object({
  friendlyName: Type.String(),
});

export const RenameDeviceRoute = {
  body: RenameDeviceBody,
  params: RenameDeviceParams,
};

// PERMIT JOIN

const PermitJoinQueryString = Type.Object({
  time: Type.Integer({ maximum: 250, minimum: 0 }),
});

export const PermitJoinRoute = {
  querystring: PermitJoinQueryString,
};
