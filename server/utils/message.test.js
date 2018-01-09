const expect = require('expect');

var {generateMessage} = require('./message');
var {generateLocationMessage} =  require('./message');

describe('Generate Message', () => {
    it('should generate correct message object', () => {
        var name = 'Martin';
        var text = "Test Message";
        var res = generateMessage(name,text);
        // expect(res.from).toBe(name);
        // expect(res.text).toBe(text);
        expect(res).toInclude({
            from:name,text:text
        });
        expect(res.createdAt).toBeA('number');
    });
});

describe('Generate Location Message', () => {
    it('should generate correct location link', () => {
        var name='Admin';
        var lat='100'
        var long='100'
        var res = generateLocationMessage('Admin',lat,long);
        expect(res).toInclude({
            from:name,
            url:`https://www.google.com/maps?q=100,100`,
            lat:lat,
            long:long 
        });
        expect(res.createdAt).toBeA('number');
    });
});