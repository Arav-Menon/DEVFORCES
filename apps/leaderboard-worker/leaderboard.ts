import { getLeaderBoard } from "@repo/redis-stream/redis-client";

while (true) {
  const addLeaderBoard = await getLeaderBoard(contestId);
}
