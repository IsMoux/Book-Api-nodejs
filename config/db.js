const mongoose= require("mongoose");
const dotenv= require("dotenv");
dotenv.config();

async function connectToDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('connceted to mongo db..');
    }catch(error){
        console.log("connection failed  to mongoDB",error);
    }
    // connection to database
}

module.exports = connectToDB;
