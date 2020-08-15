module.exports = function(io) {
    // var controller = require('./controller').init(app);
    io.on('connection', function (socket) {
        socket.emit('list_commands', {
            message: 'Welcome to home automation \nPlease choose command you want to perform(other options are available as REST apis)',
            payload: ["List all smart devices"
            ]
        });
    });

    io.on('list_devices', function (socket) {
        socket.emit('devices', {
            message: 'List of Smart devices installed',
            payload: []
        });
    });
  };
  

