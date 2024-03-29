import { App } from "./app";
import { MongoConnection } from "./mongo.conection";
import { SqsConsumers } from "./sqs.consumers";
export async function start(): Promise<void> {
  const app = new App();
  const db = new MongoConnection();
  const sqsConsumers = new SqsConsumers();

  await app.start();
  await db.connect();
  await sqsConsumers.start();

  const graceful = async () => {
    await app.stop();
    await db.disconnect();
    await sqsConsumers.stop();

    process.exit(0);
  };

  // Stop graceful
  process.on("SIGTERM", graceful);
  process.on("SIGINT", graceful);
}
