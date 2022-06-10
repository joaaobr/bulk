const routes = []

function get(path, callback) {
    routes.push({path, callback})
}



module.exports = { routes, get }