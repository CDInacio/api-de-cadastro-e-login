const express = require('express');7
const router = express();
const registerController = require('../Controllers/registerControler');
const loginController = require('../Controllers/loginController');

router.get('/login', (req, res) => res.render('login'))

router.post('/login', loginController.login);

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'Voçê está deslogado');
    res.redirect('/user/login');
})

router.get('/register', (req, res) => {
    res.render('register.ejs');
})

router.post('/register', registerController.register);




module.exports = router;
