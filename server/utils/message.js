var generateMessage = (from, text) => {
    return {
        from:from,
        text:text,
        createdAt: new Date().getTime()
    };
};
var generateLocationMessage = (from,lat,long) => {
    return {
        from:from,
        url:`https://www.google.com/maps?q=${lat},${long}`,
        lat:lat,
        long:long,
        createdAt: new Date().getTime()        
    };
};
module.exports = {generateMessage,generateLocationMessage};