import amqp from 'amqplib/callback_api'

console.log('connecting', amqp)
amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0
    }
    connection.createChannel(function(error1, channel) { // only creates if it doesn't already exist aka idempotent
      if (error1) {
          throw error1
      }
      const queue = 'hello'
      const msg = 'hello world'

      channel.assertQueue(queue, {
        durable: false
      });
  
      channel.sendToQueue(queue, Buffer.from(msg));
      console.log(" [x] Sent %s", msg);
    })

    setTimeout(function() {
        connection.close()
        console.log('connection closed')
        process.exit(0)
      }, 500)
})
