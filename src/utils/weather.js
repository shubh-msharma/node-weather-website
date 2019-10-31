let request = require('request');

function findWeather(coords,callback){
    let url = `https://api.darksky.net/forecast/8a400c1f4ddcb162f6297993f8ad7b7a/${coords.latitude},${coords.longitude}?units=si`
    request({url:url,json:true},(err,res)=>{
        if(err){
            callback(err,undefined);
        }else if(false){

        }else{
            callback(undefined,{temperature:res.body.currently.temperature,
                precipProbability:res.body.currently.precipProbability,
                place:coords.place
            });
        }
    })
}
module.exports = findWeather;