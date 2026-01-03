import axios from "axios";
import "dotenv/config";
import { evaluationNotification } from "@repo/redis-stream/redis-client";

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
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY!}`,
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

    const sendNotificationToQueue = await evaluationNotification(payload);

    console.dir(sendNotificationToQueue, { depth: null });
  } catch (err) {
    console.log(err);
  }
};
