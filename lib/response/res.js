function res( { response, httpPrototype, renderFunction } ) {

    const render = renderFunction

    // send function
    const send = (data) => {
        response.write(data)
    } 

    // json function
    const json = (obj) => {
        if (typeof(obj) == 'object') {
            send(JSON.stringify(obj))
            // return response.end()
        }
        return Error('Error: the data sent is not an object')
    }


    // status
    const status = (status) => {
        if (typeof(status) == 'number' && status >= 100 && status <= 599) {
            return httpPrototype.statusCode = status
        }
    
        return Error('Error: status is not one number')
    }

    // redirect function
    const redirect = (url) => {
        console.log(response.writeHead(301, {
            Location: `${url}`
        }))
    return response.writeHead(301, {
        Location: `${url}`
    })
}

    return {
        render, 
        json,
        send,
        status,
        redirect
    }
}



module.exports = res