import { ackSubmission, pullSubmission } from "@repo/redis-stream/redis-client";
import { processWithAi } from "@repo/ai-evaluator/evaluator";

while (true) {
  console.log("worker waiting for job");

  const submissions = (await pullSubmission()) as any;
  if (!submissions) continue;

  console.dir(submissions, { depth: null });

  const stream = submissions[0];
  const record = stream?.messages[0];

  const { systemPrompt, code, contestId, challengeId, userId } = record.message;

  console.log("PROCESSING:", record.id);

  try {
    await processWithAi({
      systemPrompt,
      code,
      challengeId,
      userId,
      contestId,
    });

    await ackSubmission(record.id);
    console.log(`Acked`, record.id);
  } catch (err) {
    console.error("Failed", record.id, err);
  }
}
