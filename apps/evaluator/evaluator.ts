import express from "express";
import "dotenv/config";
import { aiEvaluator } from "./routes/ai-evaluator";

const app = express();

app.use(express.json());

app.use("/api/v1/", aiEvaluator);

app.listen(process.env.PORT, () => {
  console.log(`evaluator is started at ${process.env.PORT}`);
});
