import {
  addToLeaderBoard,
  pullLeaderboardEvent,
  publishLeaderboardUpdate,
  getLeaderBoard,
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
    
    // Fetch updated leaderboard and publish to subscribers
    try {
      const updatedLeaderboard = await getLeaderBoard(contestId);
      const numSubscribers = await publishLeaderboardUpdate(contestId, updatedLeaderboard);
      console.log(`Published leaderboard update for contest ${contestId} to ${numSubscribers} subscribers`);
    } catch (publishError) {
      // Don't fail the entire operation if publish fails
      console.error("Failed to publish leaderboard update:", publishError);
    }
  } catch (err) {
    console.error(err, "failed to add to leaderboard event");
  }
}
