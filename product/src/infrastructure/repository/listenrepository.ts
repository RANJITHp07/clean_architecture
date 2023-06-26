import { Channel, Connection } from "amqplib";
import { channel, connection, connect } from "../config/rabbitmq";

class Listener {
  private channel: Channel | undefined;
  private connection: Connection | undefined;
  private isConnected: boolean;

  constructor() {
    this.channel = undefined;
    this.connection = undefined;
    this.isConnected = false;
  }

  async listen(exchange: string, routingKey: string, callback: (data: any) => void) {
    await this.ensureConnection();

    if (!this.channel || !this.connection) {
      throw new Error("RabbitMQ connection not available");
    }

    try {
      await this.channel.assertExchange(exchange, "direct");
      const queue = await this.channel.assertQueue("", { exclusive: true });
      await this.channel.bindQueue(queue.queue, exchange, routingKey);

      this.channel.consume(queue.queue, (data) => {
        if (data) {
          callback(JSON.parse(data.content.toString()));
          this.channel?.ack(data);
        }
      });
    } catch (err) {
      console.error("Error in listen:", err);
    }
  }

  private async ensureConnection() {
    if (!this.isConnected) {
      await connect();
      this.channel = channel;
      this.connection = connection;
      this.isConnected = true;
    }
  }
}

export default Listener;
