const { default: mongoose } = require("mongoose");

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect( URI );
        console.log("Connection Successful to DB");
    } catch (error) {
        console.error("DB Connection failed");
        process.exit(0);
    }
}

module.exports = connectDB;