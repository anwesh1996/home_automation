const logger = require('../utils/logger')
exports.catchErrors = action => (req, res, next) => action(req, res).catch(next)

exports.sendSuccessResponse = (res,data,message,code) =>{

    if(data && data.log_action){
        res.locals.log_action=data.log_action
        delete data.log_action
    }
    res.status(code).json({
        success:true,
        payload:data,
        message:message || undefined
    })
}

exports.sendFailureResponse = (res,err,message,code) =>{
    logger.write.log(err,message,code)
    res.status(code).json({
        success:false,
        payload:err || null,
        message: err && err.message ? err.message : message
    })
}