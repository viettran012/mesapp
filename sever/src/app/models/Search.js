const connection = require('../../configs/connectDB');

var Search = {
    getUser: function (query, callback) {
        // console.log(query.q);
        // return connection.query(
        //     'Select id,fullname, avatar from `users` WHERE fullname LIKE ?',
        //     [query.q + '%'],
        //     callback,
        // );
        return connection.query(
            'Select id,fullname, avatar from `users` WHERE fullname LIKE ? OR fullname LIKE ?',
            ['%' + query.q + '%', query.q + '%'],
            callback,
        );
        // console.log(topResult);
        return topResult;
    },
};
module.exports = Search;
