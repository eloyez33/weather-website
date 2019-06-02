const request = require('request')

const forecast = (latitude, logitude, callback) => {
    const url = 'https://api.darksky.net/forecast/2db94b8981b28b66cf1e8cc3490d409f/'+latitude+','+logitude+'?units=si&lang=es'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 
                body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degrees out. There is a '+body.currently.precipProbability+'% chance of rain.'
            )
        }
    })
}

module.exports = forecast