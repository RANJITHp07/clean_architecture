import amqp, { Channel, Connection } from "amqplib";

let channel: Channel | undefined;
let connection: Connection | undefined;

const connect = async function (): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const amqpServer = "amqp://localhost:5672";
      connection = await amqp.connect(amqpServer);
      channel = await connection.createChannel();
      console.log("Channel created");
      resolve(); 
    } catch (err) {
      console.error("Error connecting to RabbitMQ:", err);
      reject(err);
    }
  });
};

export { channel, connection, connect };
