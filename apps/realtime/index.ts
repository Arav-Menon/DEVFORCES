import { WebSocketServer } from "ws";
import { result } from "./broadcast/notifyResult";

const wss = new WebSocketServer({ port: 8080 });

const evaluationNotify = new result();

wss.on("connection", (socket) => {
  console.log("connection has been made");
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
