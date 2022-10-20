const message = require('../models/Message');
const user = require('../models/User');

class MessageController {
    index(req, res, next) {
        const dataUser = req.body;
        if (!dataUser.email || !dataUser.pass) {
            return res.status(200).json({
                status: 'error',
            });
        }
        user.getUserByEmail(dataUser.email, (err, results, fields) => {
            if (err) {
                return res.status(200).json({
                    status: 0,
                });
            } else {
                if (results.length === 1) {
                    if (results[0].pass === dataUser.pass) {
                        message.getAllMessage((err, results) => {
                            if (err) {
                                res.json({
                                    data: 'noresult',
                                });
                            } else {
                                let rows = results.map((row) => {
                                    return row;
                                });
                                res.status(200).json({
                                    status: 1,
                                    data: rows,
                                });
                            }
                        });
                    } else {
                        return res.status(200).json({
                            status: 0,
                        });
                    }
                } else {
                    return res.status(200).json({
                        status: 0,
                    });
                }
            }
        });
    }
    room(req, res, next) {
        const dataUser = req.body;
        if (!dataUser.email || !dataUser.pass || !dataUser.room) {
            return res.status(200).json({
                status: 'error',
            });
        }
        user.getUserByEmail(dataUser.email, (err, results, fields) => {
            if (err) {
                return res.status(200).json({
                    status: 0,
                });
            } else {
                if (results.length === 1) {
                    if (results[0].pass === dataUser.pass) {
                        // console.log('ok');
                        message.getUserMessage(dataUser.room, 20, (err, results) => {
                            if (err) {
                                res.json({
                                    data: 'noresult',
                                });
                            } else {
                                let rows = results.map((row) => {
                                    return row;
                                });
                                res.status(200).json({
                                    status: 1,
                                    data: rows,
                                });
                            }
                        });
                    } else {
                        return res.status(200).json({
                            status: 0,
                        });
                    }
                } else {
                    return res.status(200).json({
                        status: 0,
                    });
                }
            }
        });
    }
    notification(req, res, next) {
        const dataUser = req.body;
        if (!dataUser.email || !dataUser.pass) {
            return res.status(200).json({
                status: 'error',
            });
        }
        user.getUserByEmail(dataUser.email, (err, results, fields) => {
            if (err) {
                return res.status(200).json({
                    status: 0,
                });
            } else {
                if (results.length === 1) {
                    if (results[0].pass === dataUser.pass) {
                        // console.log('ok');
                        message.getNotification(20, (err, results) => {
                            if (err) {
                                res.json({
                                    data: 'noresult',
                                });
                            } else {
                                let rows = results.map((row) => {
                                    return row;
                                });
                                res.status(200).json({
                                    status: 1,
                                    data: rows,
                                });
                            }
                        });
                    } else {
                        return res.status(200).json({
                            status: 0,
                        });
                    }
                } else {
                    return res.status(200).json({
                        status: 0,
                    });
                }
            }
        });
    }
    oneline(req, res, next) {
        const dataUser = req.body;
        if (!dataUser.email || !dataUser.pass || !dataUser.room) {
            return res.status(200).json({
                status: 'error',
            });
        }
        user.getUserByEmail(dataUser.email, (err, results, fields) => {
            if (err) {
                return res.status(200).json({
                    status: 0,
                });
            } else {
                if (results.length === 1) {
                    if (results[0].pass === dataUser.pass) {
                        // console.log('ok');
                        message.getUserMessage(dataUser.room, 1, (err, results) => {
                            if (err) {
                                res.json({
                                    data: 'noresult',
                                });
                            } else {
                                let rows = results.map((row) => {
                                    return row;
                                });
                                res.status(200).json({
                                    status: 1,
                                    data: rows,
                                });
                            }
                        });
                    } else {
                        return res.status(200).json({
                            status: 0,
                        });
                    }
                } else {
                    return res.status(200).json({
                        status: 0,
                    });
                }
            }
        });
    }
}

module.exports = new MessageController();
