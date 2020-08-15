module.exports = function(app,io) {
    var controller = require('./controller').init(app,io);
    app.get('/api', function(req, res){
      console.log('Health check!',req.path,req.headers)
      res.status(200).json({"Status":"Hey! Welcome to Home automation"});
    });
  };
  