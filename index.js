const bulkFrameworkListen = require('./lib/listen')
const bulkFrameworkGet = require('./lib/get')

exports.get = bulkFrameworkGet.get
exports.listen = bulkFrameworkListen.listen