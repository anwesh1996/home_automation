var app,io;
exports.init= (app_ref,io_ref) => {
app = app_ref;
io=io_ref;
let device = require(`./device`);
device.init(app,io);
return {
    device:device
}
}
    
