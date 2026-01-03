import Redis from "ioredis";
import { broadcast } from "./broadcast";

const subClient = new Redis();

export const startNotificationSubscriber = async () => {
  const response = subClient.subscribe("submission:notification");
  console.log(response);
  subClient.on("message", (_channel, message) => {
    const parsed = JSON.parse(message);
    console.log(parsed)
    broadcast(parsed);
  });
};
