const route = require('./get')
const http = require('http')


function listen(port, callback) {
    const server = http.createServer((req, res) => {

        route.routes.map((obj => {
            if (obj.path == req.url) {
                obj.callback(req, res)
            }
        }))
    })
    
    server.listen(port, callback)
}

module.exports =  { listen } 