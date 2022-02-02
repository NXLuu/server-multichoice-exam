import User from '../models/user.model.js';
import sha1 from 'sha1';

export async function getUser(req, res) {
    
    try {
        const users = await User.find({_id: res.locals.userId});
        res.json(users);
    } catch (err) {
        console.log(err);
    }
}

export async function postUser(req, res, next) {
    try {
        const user = new User({
            email: req.body.email,
            password: sha1(req.body.password),
            name: req.body.name,
            avatar: req.file.path.split('\\').slice(1).join('/')
        });
        debugger;
        
        user.save();
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
}