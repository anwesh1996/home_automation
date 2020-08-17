var app, io;
const ObjectId = require('mongoose').Types.ObjectId;
const erroHandler = require('../error-handler');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
exports.init = (app_ref, io_ref) => {
    app = app_ref;
    io = io_ref;
}

/*
*Main-methods
*/

exports.methods = {

    create: async (req, res) => {
        try {
            erroHandler.expressHandler.sendSuccessResponse(res, await create(req.body), 'Added new device succesfully', 201)
        } catch (err) {
            app.logger.methods.error(req.path, __filename, "Error", err, "500")
            erroHandler.expressHandler.sendFailureResponse(res, err, 'There was a problem in adding new device!', 500)
        }
    },
    getAll: async (req, res) => {
        try {
            erroHandler.expressHandler.sendSuccessResponse(res, await getAll(req.query), 'List device succesfully', 200)
        } catch (err) {
            app.logger.methods.error(req.path, __filename, "Error", err, "500")
            erroHandler.expressHandler.sendFailureResponse(res, err, 'There was a problem in Listing  devices!', 500)
        }
    },
    update: async (req, res) => {
        try {
            erroHandler.expressHandler.sendSuccessResponse(res, await update(req.params.id, req.body), 'Device updated succesfully', 200)
        } catch (err) {
            app.logger.methods.error(req.path, __filename, "Error", err, "500")
            erroHandler.expressHandler.sendFailureResponse(res, err, 'There was a problem in Updating devices!', 500)
        }
    },
    _delete: async (req, res) => {
        try {
            erroHandler.expressHandler.sendSuccessResponse(res, await _delete(req.params.id), 'Device uninstalled succesfully', 200)
        } catch (err) {
            app.logger.methods.error(req.path, __filename, "Error", err, "500")
            erroHandler.expressHandler.sendFailureResponse(res, err, 'There was a problem in uninstalled device!', 500)
        }
    }
}


/*
* Re-usable methods
*/
let create = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (device_valid(data)) {
                let device = await app.db.models.Device(data).save()
                //emit socket event for creation(handled in middleware)
                device.log_action = {
                    device: data.name,
                    type: 'create'
                }
                resolve(device)
            } else {
                reject({ message: 'Invalid device details,please verify api documents', code: 400 })
            }

        }
        catch (err) {
            reject(err)
        }
    })

}

let getAll = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let devices=[];
            if(data.pageSize && data.pageNo){
                let limit=data.pageSize ? Number(data.pageSize) :30
                let skip = data.pageNo ? parseInt(data.pageNo-1)*limit:0
                devices = await app.db.models.Device.find({}).skip(skip).limit(limit).lean()
            }else{
                devices = await app.db.models.Device.find({}).lean()
            } 
            resolve(devices)
        }
        catch (err) {
            reject(err)
        }
    })

}

let update = async (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //updating only status as of now
            let device = await app.db.models.Device.update({ _id: ObjectId(id) }, { $set: { last_action_time: new Date(), status: data.status } })
            //socket event on updation
            device.log_action = {
                device: data.name,
                action: data.status,
                type: 'update'
            }
            resolve(device)
        }
        catch (err) {
            reject(err)
        }
    })

}

let _delete = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            //doing hard delete
            let device = await app.db.models.Device.findOneAndRemove({ _id: ObjectId(id) })
            device.log_action = {
                device: device.name,
                type: 'delete'
            }
            resolve(device)
        }
        catch (err) {
            reject(err)
        }
    })

}

/*
* Object validators
* we can have it outside in seperate folder as well
* since its single resource handling it in single file
* we can validate client request object with its type,length lot more using Joi npm
* We can make it as common function for all post requests based on method & route as middlewares
*/

const device_valid = (data) => {
    let createDevice = Joi.object({
        name: Joi.string().required()
    })
    const { error, value } = createDevice.validate(data);
    if (error) {
        //we can segregate errors and send to client if required
        return false;
    } else {
        return true;;
    }

}

exports.helperMethods = {
    create: create,
    getAll: getAll,
    update: update,
    _delete: _delete
}