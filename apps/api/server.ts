import express from "express";
import "dotenv/config";
import { authRoute } from "./routes/user/auth.user.js";
import { deleteUserRoute } from "./routes/user/delete.user.js";
import { updateUserRoute } from "./routes/user/update.user.js";
import { userRoute } from "./routes/user/user.js";

const app = express();
app.use(express.json());

app.use("/v1/user/", authRoute);
app.use("/v1/user/", deleteUserRoute);
app.use("/v1/user/", updateUserRoute);
app.use("/v1/user/", userRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at PORT ${process.env.PORT}`);
});
