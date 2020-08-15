module.exports = function (app, io) {
// console.log(app)
  var controller = require('./controller').init(app, io);
  app.get('/api', function (req, res) {
    console.log('Health check!', req.path, req.headers)
    res.status(200).json({ "Status": "Hey! Welcome to Home automation" });
  });
let middlewares=  require('./middlewares')(app,io)
app.post('/api/device',middlewares.action_log.log_action,controller.device.methods.create)

app.get('/api/devices',controller.device.methods.getAll)

app.put('/api/device/:id',controller.device.methods.update)

app.delete('/api/device/:id',controller.device.methods._delete)

};
