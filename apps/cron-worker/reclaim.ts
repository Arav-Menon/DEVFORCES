import { claimStuckMessage } from "@repo/redis-stream/redis-client";

setInterval(() => {
  claimStuckMessage().catch(console.error);
}, 30_000);
