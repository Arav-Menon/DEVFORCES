import { app } from "./server";
import { connectDB } from "@repo/db/db";

const start = async () => {
  try {
    await connectDB();
    console.log("[DB] Connected successfully");
  } catch (err) {
    console.error("[DB] Failed to connect:", err);
    process.exit(1);
  }

  app.listen(4000, () => {
    console.log(`Server listening on port 4000`);
  });
};

start();
