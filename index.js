const httpFrameworkListen = require('./lib/listen')
const httpFrameworkGet = require('./lib/get')

exports.get = httpFrameworkGet.get
exports.listen = httpFrameworkListen.listen