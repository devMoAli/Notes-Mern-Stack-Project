const mongoose  = require("mongoose");

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connection to MongoDB Successful ✅🦋✅");
    } catch (error) {
        console.log("Connection to MongoDB Failed 🥴", error);
    }
}
