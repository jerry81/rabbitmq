import amqp from 'amqplib/callback_api'

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0
    }
    connection.createChannel(function(error1, channel) { // only creates if it doesn't already exist aka idempotent
      if (error1) {
          throw error1
      }
      const queue = 'task_queue'
      const msg = process.argv.slice(2).join(', ') || 'hello work queue'
      console.log('msg is ', msg)

      channel.assertQueue(queue, {
        durable: false
      });
  
      channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });
      console.log(" [x] Sent %s", msg);
    })

    setTimeout(function() {
        connection.close()
        console.log('connection closed')
        process.exit(0)
      }, 500)
})
