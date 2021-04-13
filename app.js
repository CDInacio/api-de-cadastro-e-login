const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const flash = require('express-flash');
const sesison = require('express-session');
const dataBase = require('./config/key').MONGO_URI;

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(dataBase, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then((result) => app.listen(PORT, console.log(`Server running on port ${PORT}`)))
    .catch((err) => console.log(err));

require('./passport-config')(passport);

app.use(flash());
app.use(sesison({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.get('/', (req, res) => res.render('main.ejs'));
app.use('/user', require('./routes/users'));


