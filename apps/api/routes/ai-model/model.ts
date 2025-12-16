import express from "express";
import axios from "axios";
import "dotenv/config";

export const aiModelRouter = express.Router();

aiModelRouter.post("/ai", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt)
    return res.status(404).json({
      message: "Prompt is missing",
    });

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/devstral-2512:free",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({
      reply: response.data.choices[0].message.content,
    });
  } catch (err) {
    //@ts-ignore
    console.error(err?.response.data);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});
