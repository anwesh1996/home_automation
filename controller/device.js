var app,io;
const ObjectId=require('mongoose').Types.ObjectId;
const erroHandler = require('../error-handler');
exports.init = (app_ref,io_ref) =>{
    app=app_ref;
    io=io_ref;
}

/*
*Main-methods
*/

exports.methods = {

    create : async(req,res) => {
            try{
               erroHandler.expressHandler.sendSuccessResponse(res,await create(req.body),'Added new device succesfully',201)
               }catch(err){
               app.logger.methods.error(req.path, __filename, "Error", err, "500")
               erroHandler.expressHandler.sendFailureResponse(res,err,'There was a problem in adding new device!',500)
               }    
            }
}


/*
* Re-usable methods
*/
let create = async(data) => {
    return new Promise(async(resolve,reject)=>{
        try{
            
        }
        catch(err){
            reject(err)
        } 
    })
      
}

exports.helperMethods = {
    create:create
}