let request = require('request')


function findLocation(location, callback) {
    let url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(location) + ".json?proximity=-74.70850,40.78375&access_token=pk.eyJ1Ijoic2h1Ymhjb2Rlcjc3IiwiYSI6ImNrMjV0bDhiZTJ1Y2QzaHBpczlsbnFuZHoifQ.7Z1NFDEltnQqd_NjbR5FIA"
    request({ url: url, json: true }, (err, res) => {
        if (err) {
            callback(err, undefined);
        } else if (res.body.message) {
            callback({error:"data not found"},undefined);
        }else if(!res.body.features[0]){
            callback({error:"no such location.try another location"},undefined);
        }else {
            callback(undefined, {
                place: res.body.features[0].place_name,
                latitude: res.body.features[0].center[1],
                longitude: res.body.features[0].center[0]
            });
        }
    })
}

module.exports = findLocation;