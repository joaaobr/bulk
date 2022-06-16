const route = require('./get')
const http = require('http')
const response = require('./response')
const request = require('./request')

function listen(port, callback) {
    const server = http.createServer((req, res) => {  
        route.routes.map((obj => {

            const param = req.url.split('?')
            
            const params = {}
            if (param.length > 1) {
                if (obj.path == param[0]) {
                    
                    param[1] = param[1].split('?')
                    
                    
                    param[1] = param[1][0].split('&')
                    
                    for(i = 0; i < param[1].length;i++) {
                        param[1][i] = param[1][i].split('=')
                    }
                    
                    for(i = 0; i < param[1].length;i++) {
                        params[param[1][i][0]] = param[1][i][1]
                    }
                }
                const Req = request(req, params)
                const Res = response.response(res, http.ServerResponse.prototype)
                
                obj.callback(Req, Res)
                res.end()

            }


            if (obj.path == req.url) {
                const Req = request(req, params)
                const Res = response.response(res, http.ServerResponse.prototype)
                
                obj.callback(Req, Res)
                res.end()

            }
        }))
    })
    
    server.listen(port, callback)
}

module.exports =  { listen } 