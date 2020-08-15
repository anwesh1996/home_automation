/*
 * All device Data
 * 
*/
module.exports = function(app, mongoose) {
    var DeviceSchema = new mongoose.Schema({
      "name"         : { type : String, trim:true, uniq:true }, 
      "created_date" : { type : Date, default:new Date() },
      "last_action_time" : { type : Date, default:new Date() },
      "status"       : { type: Boolean,default:false}
    });
    app.db.model('Device', DeviceSchema);
  };
  