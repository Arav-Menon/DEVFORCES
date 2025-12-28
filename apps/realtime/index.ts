import { WebSocketServer } from "ws";
import { result } from "./broadcast/notifyResult";

const wss = new WebSocketServer({ port: 8080 });

const evaluationNotify = new result();

wss.on("connection", (socket) => {
  try {
    evaluationNotify.broadCastResult(socket);
  } catch (err) {
    socket.send(
      JSON.stringify({
        message: err,
      })
    );
  }
});
