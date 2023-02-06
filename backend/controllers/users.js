import { UserModel } from "../models/users.js";
import bcrypt from 'bcrypt';
import pkg from 'validator'
const { isEmail } = pkg // https://www.npmjs.com/package/validator
import { createToken } from "../utils/jwt.js";

//create new user, verify if username already exist, if not exist create new user, verify if email is valid, if email is valid create new user, verify if password is valid, if password is valid create new user
export const createUser = async (req, res) => {
    const { username, password, email } = req.body;
    if ( !username || !password || !email) { // Prevent crash if user doesn't fill all fields
     res.status(400).json('Desculpe, este username já existe')
    }
    if (!username) {
        res.status(400).json('Por favor, preencha o campo username')
    }
    const user = await UserModel.findOne({ where: { username: username } }); // Verify if username already exists
    const userEmail = await UserModel.findOne({ where: { email: email } }); // Verify if email already exists
    const validEmail = isEmail(email); // Verify if email is valid email 
    if (user) {
        res.status(400).json('Este username já existe')
    } else if (userEmail) {
        
        res.status(400).json('Este email já existe')
    } else if (!validEmail) {
        res.status(400).json('Por favor, insira um email válido')
    } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await UserModel.create({ username, password: hashedPassword, email });

        // create and assign a token
//    const token = jwt.sign({ _id: newUser.id }, process.env.TOKEN_SECRET);

 return res.status(201).send({ newUser, token });
    }
}



// get all users and dont show password
export const getAllUsers = async (req, res) => {
    const users = await UserModel.findAll({ attributes: { exclude: ['password'] } });
    res.status(200).json(users);
}


export const loginUser = async (req, res) => {
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
                username: user.username,
                isAdmin: user.isAdmin
            });
            res.status(200).json({
                message: "Login successful",
                token,
                user
            });
        }
        else {
            res.status(400).json('Palavra Passe incorreta');
        }
    }
    else {
        res.status(400).json('Username ou Palavra Passe incorreta');
    }
}


