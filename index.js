const bulkListen = require('./lib/listen')
const bulkGet = require('./lib/get')

exports.get = bulkGet.get
exports.listen = bulkListen.listen