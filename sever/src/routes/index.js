const authRouter = require('./auth');
const messageRouter = require('./message');
const searchRouter = require('./search');

function route(app) {
    app.use('/auth', authRouter);
    app.use('/api/message', messageRouter);
    app.use('/api/search', searchRouter);
}

module.exports = route;
