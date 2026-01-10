import {
  addToLeaderBoard,
  pullLeaderboardEvent,
} from "@repo/redis-stream/redis-client";

while (true) {
  const event = await pullLeaderboardEvent();

  if (!event) {
    continue;
  }

  //@ts-ignore
  const { userId, contestId, score } = event;

  try {
    const addLeaderBoard = await addToLeaderBoard({ userId, contestId, score });
    console.dir(addLeaderBoard, { depth: null });
  } catch (err) {
    console.error(err, "failed to add to leaderboard event");
  }
}
