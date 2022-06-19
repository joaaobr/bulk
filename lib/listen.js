const http = require('http')
const url = require('url')
const route = require('./get')
const response = require('./response')
const request = require('./request')

let NewObject = []
let params = {}

function routeIsEquals(definedPath, requestPath) {
    return definedPath === requestPath;
}

function routeParameters(Url, obj) {

    const NewUrl = Url

    if(Url.indexOf('?') >= 0) {
        params = url.parse(Url, true).query;

        Url = Url.slice(0, Url.indexOf('?'))
    }

    const pos = obj.path.indexOf(':') 
    let param =  pos >= 0 ? obj.path.slice(pos, obj.path.length) : obj.path

    param = param.split(':').length >= 2 ? param.split(':').filter(value => {
        if (value.replace('/', '') != '') return value.replace('/', '')
    }) : param.split(':')[1]

    const p = Url.split('/')
    p.shift()

    for (i = param.length; i < p.length; i++) {
        p.shift()
    }

    for(i=0; i < p.length;i++) {
        params[param[i].replace('/', '')] = p[i]
    }

    params = JSON.parse(JSON.stringify(params))

    const length = Url.split('/').length == obj.path.split('/').length ? true : false

    return  { params, length}
}

function listen(port, callback) {
    const server = http.createServer((req, res) => {  
        const queryParams = url.parse(req.url, true).query;
        const newObject = JSON.parse(JSON.stringify(queryParams));

        const pos = req.url.indexOf('?');
        const pathDefine = pos >= 0 ? req.url.slice(0, pos) : req.url;

        route.routes.map((obj => {      
            if (routeIsEquals(obj.path,  pathDefine)) { 

                const reqParam = request(req, newObject)

                const resArgments = {
                    response: res,
                    httpPrototype: http.ServerResponse.prototype
                }

                const resParam = response(resArgments)
                obj.callback(reqParam, resParam)
                res.end()
            }

            if(obj.params) {
                const a = routeParameters(req.url, obj)
                if(a.length) {
                    const reqParam = request(req, params)
    
                    const resArgments = {
                        response: res,
                        httpPrototype: http.ServerResponse.prototype
                    }
    
                    const resParam = response(resArgments)
                    obj.callback(reqParam, resParam)
                    res.end()
                }
            }
        }))
    })  

    server.listen(port, callback)
}

module.exports =  { listen } 