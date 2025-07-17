const jwt = require("jsonwebtoken");
const User = require("../models/user-models");

const authMiddleware = async ( req, res, next ) => {
    const token = req.header("Authorization");
    if( !token ) {
        res
            .status(401)
            .json(
                { message: "Unauthorized HTTP, Token Not Found"}
            )
    }
    const jwtToken = token.replace( "Bearer", "").trim();
    console.log("TOKEN FROM AUTHMIDDLEWARE", jwtToken);
    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_KEY);
        const userData = await User.findOne({
            email: isVerified.email
        }).select({
            password: 0,
        });
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
        // console.log(userData);
        req.user = userData;
        req.token = token;
        req.userID = userData._id;
        next();
    } catch (error) { 
        res
            .status(401)
            .json(
                { message: "Unauthorized HTTP, Token Not Found"}
            )
    }
    
}

module.exports = authMiddleware;