import { clients } from "../broadcast/wsClients";

export function broadcast(payload: unknown) {
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(payload));
    }
  }
}
