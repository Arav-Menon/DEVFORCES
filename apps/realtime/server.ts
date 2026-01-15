import { WebSocketServer } from "ws";
import { clients } from "./broadcast/wsClients";
import { startNotificationSubscriber } from "./broadcast/subscriber";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws: any) => {
  console.log("connect to server")
  clients.add(ws);

  ws.on("close", () => {
    clients.delete(ws);
  });
});

startNotificationSubscriber();
