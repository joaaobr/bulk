function response({response, httpPrototype}) {
    const send = (data) => {
        return response.write(data)
    } 

    const status = (status) => {
        if (typeof(status) == 'number') {
            return httpPrototype.statusCode = status
        }

        return Error('Error: status is not one number')
    }

    const json = (obj) => {
        if (typeof(obj) == 'object') {
            return send(JSON.stringify(obj))
        }
        return Error('Error: the data sent is not an object')
    }

    return {
        send,
        status,
        json,
    }
}



module.exports =  response