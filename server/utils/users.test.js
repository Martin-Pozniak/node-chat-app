const expect = require('expect');
const {Users} = require('./Users');

describe('Users', () => {
    
    var users;

    beforeEach( () => {

        users = new Users();

        users.users = [{
            id:'1',
            name:'Mike',
            room:'Node Course'
        },{
            id:'2',
            name:'Brad',
            room:'React Course'
        },{
            id:'3',
            name:'Syd',
            room:'Node Course'
        }]

    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id:'123',
            name:'Martin',
            room:'Room1'
        }
        users.addUser(user.id,user.name,user.room);
        
        expect(users.users).toEqual([user]);
    });

    it('should return names of user inside node course room', () => {
        var userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Mike','Syd']);
    });

    it('should return names of user inside react course room', () => {
        var userList = users.getUserList('React Course');
        expect(userList).toEqual(['Brad']);
    });

    it('should remove a user', () => {

        var userToRemove = '2'; //removes user with ID = 2
        var user = users.removeUser(userToRemove);

        expect(user.id).toEqual(userToRemove);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        var userToRemove = '99'; //removes user with ID = 2
        var user = users.removeUser(userToRemove);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        var userId = '2';
        var user = users.getUser(userId);
        expect(user).toEqual({id:'2',name:'Brad',room:'React Course'})
    });

    it('should not find user', () => {
        var userId='99';
        var user = users.getUser(userId);
        expect(user).toNotExist();
    });
});