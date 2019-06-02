const request = require('request')

const geocode = (address, callback) => {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZWxveXNhbmNoZXoiLCJhIjoiY2p3ZHJ1c3pqMGVqbzQ5bXIxcnM1bTZ3dSJ9._jTdUra3NXQy_8e06I2geg&limit=1'
    request({url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            const data = {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                place_name: response.body.features[0].place_name
            }
            callback(undefined, data)
        }  
    })
}

module.exports = geocode