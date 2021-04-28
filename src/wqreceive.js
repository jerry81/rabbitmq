import amqp from "amqplib/callback_api";

amqp.connect("amqp://localhost", function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    // only creates if it doesn't already exist aka idempotent
    if (error1) {
      throw error1;
    }
    const queue = "task_queue";

    channel.assertQueue(queue, {
      durable: false
    });

    channel.consume(
      queue,
      function(msg) {
        const secs = msg.content.toString().split(".").length - 1;
        setTimeout(function() {}, secs * 1000);
        console.log(" [x] Received  %s", msg.content.toString());
      },
      { noAck: true }
    );
  });
});
