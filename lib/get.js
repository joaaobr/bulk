const routes = []

function get(path, callback) {

    const params = path.split(':')


    routes.push({path: params[0], callback, params})
}



module.exports = { routes, get }