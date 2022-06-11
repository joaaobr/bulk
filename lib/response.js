function response(response) {
    const send = (data) => {
        return response.write(data)
    }



    return {
        send
    }
}

console.log(response)

module.exports = { response }