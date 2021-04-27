# rabbitmq

### install

brew install rabbitmq

### running service 

brew services start rabbitmq

### amqplib

general purpose protocol for messaging 

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

