const message = require('../app/models/Message');
const user = require('../app/models/User');
const allClient = [];
function socket(io, server) {
    io.on('connection', (socket) => {
        // console.log('client connect: ', socket.id);
        socket.on('error', function (e) {
            console.log('socket Error: ', e);
        });
        socket.on('connect signal', (id) => {
            // console.log('client connect: ', id);
            allClient.push({ id, sockedId: socket.id });
            console.log(allClient);
            // console.log(Math.random());
            user.updateStatus(id, 1, (err, results, fields) => {
                if (err) {
                    console.log(err);
                }
            });

            io.emit('friend status', { id, status: 1 });
        });

        socket.on('room', (room) => {
            // console.log('join room: ', room);
            socket.join(room);
        });

        socket.on('chat data', (msg) => {
            // io.emit('chat data', msg);
            // console.log(msg);
            message.addMessageRoom(msg.dataMess, msg.room, (err, results, fields) => {
                if (err) {
                    console.log(err);
                }
            });
            socket.to(msg.room).emit('receive', msg);
        });
        socket.on('oninput', (msg) => {
            // io.emit('chat data', msg);
            // console.log(msg);
            // message.addMessageRoom(msg.dataMess, msg.room, (err, results, fields) => {
            //     if (err) {
            //         console.log(err);
            //     }
            // });

            socket.to(msg.room).emit('oninput', msg);
        });
        socket.on('global message', (dataMes) => {
            console.log(dataMes);
            io.emit('global message', dataMes);
            message.addNotification(dataMes, (err, results, fields) => {
                if (err) {
                    console.log(err);
                }
            });
        });
        socket.on('disconnect', () => {
            const clientDisconnect = allClient.find((client) => client.sockedId === socket.id);
            if (!clientDisconnect) {
                return;
            }
            const index = allClient.indexOf(clientDisconnect);
            allClient.splice(index, 1);

            const refindUser = allClient.find((client) => clientDisconnect.id === client.id);
            // console.log(refindUser);

            if (!refindUser) {
                if (clientDisconnect) {
                    // user.updateStatus(clientDisconnect.id, 0, (err, results, fields) => {
                    //     if (err) {
                    //         console.log(err);
                    //     }
                    // });
                    user.updateLastAccess(clientDisconnect.id, 0, (err, results, fields) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                    const time = new Date();
                    io.emit('friend status', { id: clientDisconnect.id, status: 0, time });
                }
            }
            console.log(allClient);
        });
    });
}

module.exports = socket;
