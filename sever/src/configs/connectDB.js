var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'quocviet.intern.midvietnam.com',
    port: '3308',
    user: 'quocviet_intern_',
    password: 'wDf9aKIRaK90tZ0Z',
    database: 'quocviet_intern_',
});

pool.getConnection(function (err) {
    if (err) {
        console.log('error when connecting to db:', err);
    }
});
// function Connection(connection_) {
//     connection_.getConnection(function (err, connection) {
//         if (err) {
//             console.error('mysql keepAlive err', err);
//             return;
//         }
//         connection.ping(); // this is what you want
//         connection.release();
//     });
// }
function keepAlive() {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.error('mysql keepAlive err', err);
            return;
        }
        connection.ping(); // this is what you want
        connection.release();
    });
}
setInterval(keepAlive, 60000);

// module.exports = pool;

module.exports = {
    query: function () {
        var sql_args = [];
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        // console.log(args);
        var callback = args[args.length - 1]; //last arg is callback
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                return callback(err);
            }
            if (args.length > 2) {
                sql_args = args[1];
            }
            connection.ping(); // this is what you want
            // connection.release();
            connection.query(args[0], sql_args, function (err, results) {
                connection.release(); // always put connection back in pool after last query
                if (err) {
                    console.log(err);
                    return callback(err);
                }
                callback(null, results);
            });
        });
    },
    connect: function () {
        pool.getConnection(function (err) {
            if (err) {
                console.log('error when connecting to db:', err);
            }
        });
    },
};
