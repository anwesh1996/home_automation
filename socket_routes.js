const { func } = require('@hapi/joi');

module.exports = function (io, app) {
    var controller = require('./controller').init(app, io);
    io.on('connection', async function (socket) {
        socket.emit('list_commands', {
            message: 'Welcome to home automation \nPlease choose command you want to perform(other options are available as REST apis)',
            payload: ["List all smart devices"
            ]
        });

        socket.on('list_devices', async function (data) {
            console.log('list device')
                try {
                    socket.emit('devices', {
                        message: 'List of Smart devices installed',
                        payload: await controller.device.helperMethods.getAll()
                    });
                } catch (err) {
                    app.logger.methods.error(err, 'Something went wrong in list_devices event')
                    socket.emit('devices', {
                        message: 'Something went wrong in listing devices',
                        payload: null
                    });
                }
        });
//Not implimented from client side
        socket.on('add_device',async function(data) {
            console.log(data)
            await controller.device.helperMethods.create(JSON.parse(data))
        })

        socket.on('update_device',async function(data) {
            let reqData = JSON.parse(data)
            await controller.device.helperMethods.update(reqData._id,reqData)
        })

        socket.on('delete_device',async function(data) {
            await controller.device.helperMethods._delete(JSON.parse(data)._id)
        })
        
    });


};


