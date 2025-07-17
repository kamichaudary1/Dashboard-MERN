const User = require("../models/user-models");
const bcrypt = require("bcrypt");

const home = async ( req, res ) => {
    try {
        console.log( req.body );
        res
            .status(200)
            .send("Page coming from Router auth-router");
    } catch (error) {
        res.status(400).send({msg: "page not found"})
    }
}

const register = async ( req, res ) => {
    try {
        const { username, email, phone, password } = req.body;
        const userExist = await User.findOne({ email });
        if( userExist ) {
            return res.status( 400 ).json({msg: "email exist"});
        }
        const userCreated = await User.create({ 
            username, 
            email, 
            phone, 
            password,
        });
        const token = await userCreated.generateToken();
        // console.log("🪙 Token generated:", token);
        res.status(201).json({
            message: "registration successful", 
            token,
            userId: userCreated._id.toString(),
        });
    } catch (error) {
        // res.status(400).send({msg: "page not found"});
        next(error);
    }
}

const login = async ( req, res ) => {
    try {
        const { email, password } = req.body;
        // check if email is valid
        const userExist = await User.findOne({ email });
        if( !userExist ) {
            return res
                .status( 400 )
                .json({ message: "Invalid Credentials" });
        }
        // Compare Password hash password
        const userPassword = await userExist.comparePassword(password);
        if( userPassword ) {
            res.status( 200 ).json({
                msg: "Login Successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        } else {
            res.status( 401 ).json({ message: "Invalid Creds" })
        }
    } catch (error) {
        res.status( 500 ).json("Internal Server Error");
    }
}
// to send user data, user logic
const user = async ( req, res ) => {
    try {
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({userData});
        // res.status(200).json({msg: "Hi"})
    } catch (error) {
        console.log(`Error from USER Route, ${error}`);
    }
}


module.exports = { home, register, login, user };