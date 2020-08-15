/*
// This will be executed after finishinng request,on end
// Log any action performed in web console
*/
var app,io;
module.exports.init= (appDef,io_ref)=>{
    app=appDef,
    io=io_ref
}

//this will not block the request,will execute on finishing request
module.exports.log_action = (req,res,next) => {
   res.on('finish',async()=>{
      if(res.locals.log_action){
        let message=''
        let action = res.locals.log_action.action ? 'Turned On' : 'Turned Off'
        switch(res.locals.log_action.type){
          case 'create':
            message = `A ${res.locals.log_action.device} has been Installed in your home`
            break;
          case 'update':
            message = `A ${res.locals.log_action.device} has been ${action} in your home`
            break;
          case 'delete':
            message = `A ${res.locals.log_action.device} has been Uninstalled in your home`
            break;
          default:
            message = `An Un-expected logging mechanism occured`
            break;
        }
        io.emit('log_action',{message:message});
      }
  })
  next();
}