import type { WebSocket } from "ws";
import { broadCastEvaluationResult } from "@repo/redis-stream/redis-client";

export class result {
  broadCastResult(socket: WebSocket) {
    this.addBroadCastResult(socket);
  }

  private async addBroadCastResult(socket: WebSocket) {
    try {
      const evaluationsData = (await broadCastEvaluationResult()) as any;

      console.log(evaluationsData, { depth: null });
    } catch (err) {
      socket.send(
        JSON.stringify({
          message: err,
        })
      );
    }
  }
}
