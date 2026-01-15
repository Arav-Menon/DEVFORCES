import {
  addToLeaderBoard,
  pullLeaderboardEvent,
} from "@repo/redis-stream/redis-client";

while (true) {
  const event = (await pullLeaderboardEvent()) as any;

  console.dir(event, {depth : null});

  if (!event) {
    continue;
  }


  const stream = event[0];
  const record = stream?.messages[0];

  
  const { userId, contestId, score } = record.message;

  console.log("Processing", record.id)

  try {
    const addLeaderBoard = await addToLeaderBoard({ userId, contestId, score });
    console.dir(addLeaderBoard, { depth: null });
  } catch (err) {
    console.error(err, "failed to add to leaderboard event");
  }
}
