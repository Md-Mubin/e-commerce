const mongoose = require("mongoose")

const db =()=>{
    mongoose.connect(process.env.MONGO_DATA_BASE_URL)
    .then(()=>{
        console.log("Database Connected")
    })
} 

module.exports = db