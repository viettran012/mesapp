const user = require('../models/User');
const message = require('../models/Message');
const search = require('../models/Search');

class SearchController {
    index(req, res, next) {
        res.json({
            message: 'error',
        });
    }
    user(req, res, next) {
        search.getUser(req.query, (err, results, fields) => {
            if (err) {
                // console.log(err);
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
    }
}

module.exports = new SearchController();
