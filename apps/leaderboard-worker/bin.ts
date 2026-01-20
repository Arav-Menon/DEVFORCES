import cluster from "cluster";
import os from "os";
import { app } from "./server";

const totalCpus = os.cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < totalCpus; i++) {
    cluster.fork();
  }
  cluster.on("exit", () => {
    cluster.fork();
  });
} else {
  app.listen(process.env.PORT);
}
