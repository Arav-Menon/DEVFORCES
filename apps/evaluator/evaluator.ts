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
