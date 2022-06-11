function response(response, httpPrototype) {
    const send = (data) => {
        return response.write(data)
    } 

    const status = (status) => {
        if (typeof(status) == 'number') {
            return httpPrototype.statusCode = status
        }

        return Error('Error: status is not one number')
    }

    return {
        send,
        status
    }
}

console.log(response)



module.exports = { response }