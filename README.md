# rabbitmq

### install

brew install rabbitmq

### running service 

brew services start rabbitmq

### amqplib

general purpose protocol for messaging 

### rabbitmqctl

cli tool like kubectl to query the rabbitmq server
commands:
    list_queues - shows name and messages in post offices
    list_channels

### work queues

aka task queues
use case:
task takes backend relatively long time
repalce sychronous response with delegation to message queue 

### passing args to npm scripts

npm run script -- args
(try it with yarn too)

### troubleshooting

syntaxerror: cannot use import statement outside a module
cause: this is an es6 feature
solution: add "type": "module" to package.json (only works on node 13)
solution: use babel

### defs

producer - sends messages
queue - "post box"
consumer - receives messages
 producer, queue, consumer don't need to be on same host
exchanges - another layer setting between producer/consumer and queue 
    types
        direct
        topic
        headers
        fanout - broadcasts to all listening queues