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
    const queue = "hello";
    channel.assertQueue(queue, {
      durable: false
    });
    console.log("waiting for messages in %s", queue);

    channel.consume(
      queue,
      function(msg) {
        console.log("received %s", msg);
      },
      { noAck: true }
    );
  });

});
