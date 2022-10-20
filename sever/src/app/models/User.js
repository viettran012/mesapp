const connection = require('../../configs/connectDB');
var now = new Date();
var jsonDate = now.toJSON();
var then = new Date(jsonDate);
var User = {
    getAllUser: function (callback) {
        return connection.query('Select * from `users`', callback);
    },
    getFriends: function (callback) {
        return connection.query('Select id,fullname, avatar, status, lastaccess from `users`', callback);
    },
    getUserById: function (id, callback) {
        return connection.query('select * from `users` where Id=?', [id], callback);
    },
    getUserByEmail: function (email, callback) {
        return connection.query('select * from `users` where email=?', [email], callback);
    },
    addUser: function (user, callback) {
        console.log(user);
        return connection.query(
            'Insert into users(fullname,email,pass,avatar,sex,birthdate, permission,status	) values(?,?,?,?,?,?,?,?)',
            [
                user.fullname,
                user.email,
                user.pass,
                'https://cdn5.vectorstock.com/i/thumb-large/29/09/avatar-m-vector-37332909.jpg',
                '',
                '',
                'user',
                0,
            ],
            callback,
        );
    },
    updateUser: function (user, callback) {
        // console.log(user);
        return connection.query(
            'update users set fullname=?, sex=?,birthdate=? where email=?',
            [user.fullname, user.sex, user.birthdate, user.email],
            callback,
        );
    },
    updateStatus: function (userId, status, callback) {
        // console.log(userId);
        return connection.query('update users set status=? where id=?', [status, userId], callback);
    },
    updateLastAccess: function (userId, status, callback) {
        // console.log(userId);
        const date = new Date();
        return connection.query(
            'update users set lastaccess=?, status =? where id=?',
            [date, status, userId],
            callback,
        );
    },
    // deleteSV: function (id, callback) {
    //     return connection.query('delete from `users` where Id=?', [id], callback);
    // },
    // updateSV: function (id, sinhvien, callback) {
    //     return connection.query(
    //         'update sinhvien set name=?,class=?,dob=? where Id=?',
    //         [sinhvien.name, sinhvien.class, sinhvien.dob, id],
    //         callback,
    //     );
    // },
};
module.exports = User;
