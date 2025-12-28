import { pullSubmission } from "@repo/redis-stream/redis-client";
import { processWithAi } from "@repo/ai-evaluator/evaluator";

while (true) {
  console.log("worker waiting for job");

  const submissions = (await pullSubmission()) as any;
  if (!submissions) continue;

  console.dir(submissions, { depth: null });

  const stream = submissions[0];
  const record = stream?.messages[0];

  const { systemPrompt, code, challengeId, userId } = record.message;

  console.log("PROCESSING:", record.id);

  await processWithAi({
    systemPrompt,
    code,
    challengeId,
    userId,
  });
}
