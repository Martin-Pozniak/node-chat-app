/*****************************************
* Keeps track of users in each room
*****************************************/

/*****************************************
* Data Structure for users
*****************************************/
[{
    id:'/12312asd',
    name:'Andrew',
    room:'Room1'
}]

/*****************************************
* Class: Users class using ES6 classes
*****************************************/
class Users {
    
    constructor () {
        this.users = []; //implicitly creates a users array
    }

    /*****************************************
    * Function: addUser(id,name, room)
    *****************************************/
    addUser(id,name,room) {
        var user = {id:id,name,room};
        this.users.push(user);
        return user;
    }

    /*****************************************
    * Function: removeUser(id)
    *****************************************/
    removeUser(id) {

        var userToRemove = this.users.filter( (user) => {
            return user.id === id;
        });

        if(userToRemove[0]) {
            this.users = this.users.filter( (user) => {
                return user.id != id
            });
        }

        return userToRemove[0];
    }

    /*****************************************
    * Function: getUser(id)
    *****************************************/
    getUser(id) {
        var userToReturn = this.users.filter( (user) => {
            return user.id === id;
        });
        return userToReturn[0];
    }

    /*****************************************
    * Function: getUserList(room)
    *****************************************/
    getUserList(room) {
        var users = this.users.filter( (user) => {
            return user.room === room;
        });

        var namesArray = users.map( (user) => {
            return user.name;
        });

        return namesArray;
    }
}

module.exports = {Users};