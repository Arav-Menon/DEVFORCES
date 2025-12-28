import axios from "axios";
import "dotenv/config";
import { publishEvaluationResult } from "@repo/redis-stream/redis-client";

export const processWithAi = async ({
  systemPrompt,
  code,
  challengeId,
  userId,
}: any) => {
  console.log("request is reaching here");
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/devstral-2512:free",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: code },
        ],
      },
      {
        headers: {
          Authorization: `Bearer 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`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:4000",
          "X-Title": "DevForces Evaluator",
        },
      }
    );
    const result = response.data.choices[0].message.content;

    console.log(result);

    const payload = {
      result,
      userId,
      challengeId,
    };

    const sendNotificationToQueue = await publishEvaluationResult(payload);

    console.dir(sendNotificationToQueue, { depth: null });
  } catch (err) {
    console.log(err);
  }
};
