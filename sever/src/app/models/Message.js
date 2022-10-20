const connection = require('../../configs/connectDB');

var Message = {
    addMessage: function (mesageData, callback) {
        // console.log(mesageData);
        return connection.query(
            'Insert into messages(userid,username,text, time, avatar) values(?,?,?,?,?)',
            [mesageData.id, mesageData.username, mesageData.text, mesageData.time, mesageData.avatar],
            callback,
        );
    },
    getAllMessage: function (callback) {
        return connection.query('Select * from `messages` ORDER BY id DESC LIMIT 20 ', callback);
    },

    getUserMessage: function (room, num, callback) {
        // console.log(room);
        return connection.query(
            'Select * from `usermessages` WHERE room = ? ORDER BY id DESC LIMIT ?',
            [room, num],
            callback,
        );
    },
    getNotification: function (num, callback) {
        // console.log(room);
        return connection.query('Select * from `notifications`  ORDER BY id DESC LIMIT ?', [num], callback);
    },
    addNotification: function (data, callback) {
        // console.log(data);
        return connection.query(
            'Insert into notifications(title,message) values(?,?)',
            [data.title, data.message],
            callback,
        );
    },
    addMessageRoom: function (mesageData, room, callback) {
        // console.log(mesageData);
        return connection.query(
            'Insert into usermessages(userid,username,text, time, avatar, room) values(?,?,?,?,?,?)',
            [mesageData.id, mesageData.username, mesageData.text, mesageData.time, mesageData.avatar, room],
            callback,
        );
    },
    updateUserName: function (user, callback) {
        // console.log(user);
        return connection.query(
            'update usermessages set username=? where userid=?',
            [user.fullname, user.id],
            callback,
        );
    },
};
module.exports = Message;
