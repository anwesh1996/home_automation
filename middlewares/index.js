module.exports = function(app,io){
    require('./action_logger').init(app,io)
    return {
        action_log : require('./action_logger')
    }
}