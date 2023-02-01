import { UserModel } from "../models/users.js";
import bcrypt from 'bcrypt';

//create new user, verify if username already exist, if not exist create new user, verify if email is valid, if email is valid create new user, verify if password is valid, if password is valid create new user
export const createUser = async (req, res) => {
    const newUser = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    };
    // verify if name already exist in database
    const userName = await UserModel.findOne({
        where: {
            username: newUser.username
        }
    });
    if (userName) {
        res.status(400).json('Desculpe, este username já existe');
        return;
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;

    const asd = await UserModel.create(newUser);
    const { password, ...user } = asd.dataValues;


    const token = createToken(user);

    res.send(token);
}


// verify if email is valid
function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// get all users and dont show password
export const getAllUsers = async (req, res) => {
    const users = await UserModel.findAll({ attributes: { exclude: ['password'] } });
    res.status(200).json(users);
}


export const login = async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({
        where: {
            username
        }
    });

    if (user) {
        const isValid = bcrypt.compareSync(password, user.password);
        if (isValid) {
            const token = createToken({
                id: user.id,
                username: user.unsername,
                isAdmin: user.isAdmin
            });
            res.status(200).json({
                message: "Login successful",
                token,
                user
            });
        }
        else {
            res.status(401).json('Palavra Passe incorreta');
        }
    }
    else {
        res.status(401).json('username ou Palavra Passe incorreta');
    }
}
