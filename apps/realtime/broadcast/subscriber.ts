import Redis from "ioredis";
import { broadcast } from "./broadcast";
import { client } from "@repo/redis-stream/redis-client";
import { v4 as uuidV4 } from "uuid";

const subClient = new Redis();
const evaluationId = uuidV4();

export const startNotificationSubscriber = () => {
  const response = subClient.subscribe("submission:notification");
  console.log(response);
  subClient.on("message", async (_channel, message) => {
    const parsed = JSON.parse(message);
    await client.set(`evaluation${evaluationId}`, JSON.stringify(parsed), {
      EX: 3600,
    });
    broadcast(parsed);
  });
};
