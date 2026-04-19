import Database from "better-sqlite3";
import { MqttClient } from "mqtt";

declare module "fastify" {
  interface FastifyInstance {
    db: ReturnType<typeof Database>;
    mqttClient: MqttClient | undefined;
  }
}
