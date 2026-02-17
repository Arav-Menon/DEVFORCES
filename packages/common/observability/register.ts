import client from "prom-client";

const globalForProm = globalThis as unknown as {
  __prom_register: typeof client.register;
};

if (!globalForProm.__prom_register) {
  console.log(`[Observability] Initializing singleton register (PID: ${process.pid})`);
  globalForProm.__prom_register = client.register;
  client.collectDefaultMetrics({ register: globalForProm.__prom_register });
} else {
  console.log(`[Observability] Using existing singleton register (PID: ${process.pid})`);
}

export const register = globalForProm.__prom_register;

export const serveMetrics = async (res: any) => {
  try {
    const metrics = await register.metrics();
    res.set("Content-Type", register.contentType);
    res.end(metrics);
  } catch (err) {
    res.status(500).end(String(err));
  }
};