const routes = []

function get(path, callback) {
    const params = path.indexOf(':') >= 0 ? true : false
    routes.push({path, callback, params})
}


module.exports = { routes, get }