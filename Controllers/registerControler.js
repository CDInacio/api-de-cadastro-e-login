const User = require('../models/User');

exports.register = async (req, res) => {
    let errors = [];
    const { name, email, password, password2 } = req.body;

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Preencha todos os campos!' });
    }

    if (password != password2) {
        errors.push({ msg: 'Senhas diferentes!' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'A senha deve ter 8 ou mais caracteres' });
    }

    if (errors.length > 0) {
        res.render('register', { errors, name, email, password, password2 })
    } else {
        try {
            if (await User.findOne({ email })) {
                errors.push({ msg: 'Usuário ja cadastrado!' });
                res.render('register', { errors, name, email, password, password2 })
            }

            let user = new User({ name, email, password });
            user = await user.save();
            res.redirect('/user/login');
        } catch (e) {
            console.log(e)
        }
    }
}