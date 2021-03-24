import request from 'request';

export const geocode= function(address,callback){
    const url= `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYXZhdGFyNDE0IiwiYSI6ImNrbWRzMmpiODBwZ3gycG1jMzR4NjE2NDQifQ.BxdTEuoFO-Vikrz-8FuX_A&limit=1`;
     request(url,{url, json : true}, (error,{body} = {}) => {
         if(error){
            callback({'error' : 'Unable to connect to location services'},undefined);
        }
        else if (typeof body.message !== 'undefined') {
            callback({'error' :  + `${body.message}` },undefined);
        }
        else {
            if (body.features.length === 0) {
                callback({'error' : 'Location not found'},undefined)
            }
            else {
                const latitude= body.features[0].center[1];
                const longitude= body.features[0].center[0];
                const location= body.features[0].place_name;
                callback(undefined,{latitude : latitude, longitude : longitude, location : location});
            }
        }
    })
}

