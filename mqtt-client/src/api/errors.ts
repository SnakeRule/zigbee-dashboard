import { StatusCodeReply } from "fastify/types/utils";
import Type, { Static } from "typebox";

const ApiError = Type.Object({
  statusCode: Type.Integer(),
  code: Type.String(),
  error: Type.String(),
  message: Type.String(),
});
export type ApiError = Static<typeof ApiError>;

export function invalidDataError({
  statusCode,
  message,
}: {
  statusCode?: number;
  message: string;
}): ApiError {
  return {
    statusCode: statusCode ?? 400,
    code: "INVALID_DATA",
    error: "Invalid data",
    message: message,
  };
}
