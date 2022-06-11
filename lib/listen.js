const route = require('./get')
const http = require('http')
const response = require('./response')

function listen(port, callback) {
    const server = http.createServer((req, res) => {

        
        route.routes.map((obj => {
            if (obj.path == req.url) {
                
                const Res = response.response(res, http.ServerResponse.prototype)
                
                obj.callback(req, Res)
                res.end()

            }
        }))
    })
    
    server.listen(port, callback)
}

module.exports =  { listen } 