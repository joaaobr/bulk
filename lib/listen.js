/*
Bulk framework

@public

*/

const http = require('http')
const url = require('url')
const route = require('./get')
const response = require('../lib/response/res')
const request = require('./request')
const fs = require('fs')
const routeParameters = require('./request/params')

let NewObject = []

function routeIsEquals(definedPath, requestPath) {
    return definedPath === requestPath;
}

function listen(port, callback) {
    const server = http.createServer((req, res) => {  
        // render

        const render = (archive) => {
            fs.readFile(archive, function (err, html) {
                if (err) {
                    throw err; 
                }       
                res.writeHeader(200, {"Content-Type": "text/html"});  
                res.write(html);  
                res.end()
            });
        }

        const queryParams = url.parse(req.url, true).query;
        const newObject = JSON.parse(JSON.stringify(queryParams));

        const pos = req.url.indexOf('?');
        const pathDefine = pos >= 0 ? req.url.slice(0, pos) : req.url;
        
        
        route.routes.map((obj => {      
            if (routeIsEquals(obj.path,  pathDefine)) { 
                const reqParam = request(req, newObject)
                
                const resArgments = {
                    response: res,
                    httpPrototype: http.ServerResponse.prototype,
                    renderFunction: render
                }

                const resParam = response(resArgments)
                obj.callback(reqParam, resParam)
            }

            if(obj.params) {

                const params = routeParameters(req.url, obj)

                if(params.length) {
                    const reqParam = request(req, params.params)
    
                    const resArgments = {
                        response: res,
                        httpPrototype: http.ServerResponse.prototype,
                        renderFunction: render
                    }
    
                    const resParam = response(resArgments)
                    obj.callback(reqParam, resParam)
                }
            }
        }))
    })  

    server.listen(port, callback)
}

module.exports =  { listen } 