import type { WebSocket } from "ws";
import { broadCastEvaluationResult } from "@repo/redis-stream/redis-client";

export class result {
  broadCastResult(socket: WebSocket) {
    this.addBroadCastResult(socket);
  }

  private async addBroadCastResult(socket: WebSocket) {
    try {
      while (socket.readyState === socket.OPEN) {
        const evaluationsData = (await broadCastEvaluationResult()) as any;
        console.dir(evaluationsData, { depth: null });
      }
    } catch (err) {
      socket.send(
        JSON.stringify({
          message: err,
        })
      );
    }
  }
}
