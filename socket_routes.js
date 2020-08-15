module.exports = function(io) {
    // var controller = require('./controller').init(app);
    io.on('connection', function (socket) {
        socket.emit('list_commands', {
            message: 'Welcome to home automation \nPlease choose command you want to perform',
            payload: ["List all smart devices", "Add new smart device",
                "Perform an operation on a device",
                "Remove an installed device"
            ]
        });
    });
  };
  

