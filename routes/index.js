let express = require('express');
let router = express.Router();
let { check, validationResult } = require('express-validator');
let DatabaseController = require('../src/DatabaseController');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home/home');
});

router.get('/register', function(req, res, next) {
    res.render('register/form');
});

router.get('/register/success', function(req, res, next) {
    res.render('register/success');
});

router.get('/register/error', function(req, res, next) {
    res.render('register/error');
});

router.post('/register', [
    check('firstName').isAlpha(),
    check('lastName').isAlpha(),
    check('email').isEmail(),
    check('faculty').isAlpha(),
    check('year').isNumeric()
], function(req, res, next) {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
        let firstName = req.body['firstName'];
        let lastName = req.body['lastName'];
        let email = req.body['email'];
        let faculty = req.body['faculty'];
        let year = req.body['year'];
        DatabaseController.storeSubscriptionData(firstName, lastName, email, faculty, year)
            .then(function () {
                res.redirect('/register/success');
            })
            .catch(function () {
                res.redirect('/register/error')
            });
    } else {
        res.redirect('/register/error')
    }
});

module.exports = router;
