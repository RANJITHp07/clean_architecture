import { Channel, Connection } from "amqplib";
import { channel, connection, connect } from "../config/rabbitmq";

class Publisher {
  private channel: Channel | undefined;
  private connection: Connection | undefined;
  private isConnected: boolean;

  constructor() {
    this.channel = undefined;
    this.connection = undefined;
    this.isConnected = false;
  }

  async publish(exchange: string, routingKey: string, data: unknown): Promise<boolean> {
    await this.ensureConnection();

    if (!this.channel || !this.connection) {
      throw new Error("RabbitMQ connection not available");
    }

    try {
      await this.channel.assertExchange(exchange, "direct");
      const sent = await new Promise<boolean>((resolve, reject) => {
        this.channel!.publish(
          exchange,
          routingKey,
          Buffer.from(JSON.stringify(data)),
          { persistent: true }
        );
        resolve(true);
      });

      return sent;
    } catch (err) {
      console.error("Error in publish:", err);
      return false;
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

export default Publisher;
