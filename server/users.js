const users = [];

const addUser = ({id, name, room}) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.room === room && user.name === name);

    if(existingUser){
        return {error: 'User name is taken!'};
    };
    
    const user = {id, name, room};
    users.push(user);
    console.log(`new user ${user.name} added to room ${user.room}!`);
    return { user };
};

const removeUser = (id) => {
    const UserIndexToRemove = users.findIndex((user) => user.id === id);
    if(UserIndexToRemove !== -1){
        return users.splice(UserIndexToRemove, 1)[0];
    }
    
};

const getUser = (id) => {
    return users.find( user => user.id === id);
};

const getUsersInRoom = (room) => {
    return users.filter((user) => user.room === room);
};

module.exports = {addUser, removeUser, getUser, getUsersInRoom};