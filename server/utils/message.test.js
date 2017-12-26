const expect = require('expect');

var {generateMessage} = require('./message');

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