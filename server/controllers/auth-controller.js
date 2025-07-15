const User = require("../models/user-models");

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
        res.status(201).json({message: userCreated});
    } catch (error) {
        res.status(400).send({msg: "page not found"});
    }
}

module.exports = { home, register };