const url = require('url')

function routeParameters(Url, obj) {
    let params = {}
    const NewUrl = Url

    if(Url != 'favicon.ico') {
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

        return  { params, length }
    }
    
}

module.exports = routeParameters