const user = require('../models/User');
const message = require('../models/Message');

class AuthController {
    index(req, res, next) {
        res.json({
            message: 'error',
        });
    }
    allUser(req, res, next) {
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
                        user.getFriends((err, results, fields) => {
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
    allUserAdmin(req, res, next) {
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
                    if (results[0].pass === dataUser.pass && results[0].permission === 'admin') {
                        user.getAllUser((err, results, fields) => {
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
    // user(req, res, next) {
    //     const formData = req.body;
    //     user.getAllUser((err, results, fields) => {
    //         if (err) {
    //             res.json({
    //                 data: 'noresult',
    //             });
    //         } else {
    //             let rows = results.map((row) => {
    //                 return row;
    //             });
    //             res.status(200).json({
    //                 data: rows,
    //             });
    //         }
    //     });
    // }
    register(req, res, next) {
        const dataUser = req.body;

        if (!dataUser.fullname || !dataUser.email || !dataUser.pass) {
            return res.status(200).json({
                status: 'error',
            });
        }
        user.getUserByEmail(dataUser.email, (err, results, fields) => {
            if (err) {
                // console.log(err);
                return res.json({
                    status: 0,
                });
            } else {
                if (results.length === 0) {
                    user.addUser(dataUser, (err, results, fields) => {
                        return res.status(200).json({
                            status: 1,
                        });
                    });
                } else {
                    return res.status(200).json({
                        status: 2,
                    });
                }
            }
        });
    }
    login(req, res, next) {
        const dataUser = req.body;
        // console.log(dataUser);
        if (!dataUser.email || !dataUser.pass) {
            return res.status(200).json({
                status: 'error',
            });
        }
        user.getUserByEmail(dataUser.email, (err, results, fields) => {
            if (err) {
                return res.status(200).json({
                    status: 'error db',
                });
            } else {
                if (results.length === 1) {
                    if (results[0].pass === dataUser.pass) {
                        return res.status(200).json({
                            status: 1,
                            data: results,
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
    adminAuth(req, res, next) {
        const dataUser = req.body;
        // console.log(dataUser);
        if (!dataUser.email || !dataUser.pass) {
            return res.status(200).json({
                status: 'error',
            });
        }
        user.getUserByEmail(dataUser.email, (err, results, fields) => {
            if (err) {
                return res.status(200).json({
                    status: 'error db',
                });
            } else {
                if (results.length === 1) {
                    if (results[0].pass === dataUser.pass && results[0].permission === 'admin') {
                        return res.status(200).json({
                            status: 1,
                            data: results,
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
    update(req, res, next) {
        const dataUser = req.body;
        // console.log(dataUser);
        if (!dataUser.email || !dataUser.pass || !dataUser.fullname || !dataUser.sex || !dataUser.birthdate) {
            return res.status(200).json({
                status: 'error',
            });
        }
        user.getUserByEmail(dataUser.email, (err, results, fields) => {
            if (err) {
                return res.status(200).json({
                    status: 'error db',
                });
            } else {
                if (results.length === 1) {
                    if (results[0].pass === dataUser.pass) {
                        user.updateUser(dataUser, (err, results, fields) => {
                            if (err) {
                                console.log(err);
                                console.log(dataUser);
                                return res.status(200).json({
                                    status: 0,
                                });
                            } else {
                                message.updateUserName(dataUser, (err, results, fields) => {
                                    console.log('error when update name of message');
                                });
                                return res.status(200).json({
                                    status: 1,
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

module.exports = new AuthController();
