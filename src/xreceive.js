import amqp from 'amqplib/callback_api'

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0
    }
    connection.createChannel(function(error1, channel) { // only creates if it doesn't already exist aka idempotent
      if (error1) {
          throw error1
      }

      channel.assertExchange('logs', 'fanout', {
        durable: false
      });

      channel.assertQueue('', {
        exclusive: true
      }, function(error2, q) {
        if (error2) {
          throw error2;
        }
        console.log('waiting of for messages in ', q.queue)
        channel.bindQueue(q.queue, 'logs', '');
        channel.consume(q.queue, function(msg) {
          if (msg.content) {
            console.log('x is ', msg.content.toString())
          }
        }, {
          noAck: true
        })
      })
    })
})
