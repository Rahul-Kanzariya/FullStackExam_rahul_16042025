const { default: mongoose } = require("mongoose");

async function mongoConnection(){
    try {
        await mongoose.connect("mongodb://localhost:27017/FullStackExam_rahul_16042025");
    } catch (err) {
        throw new Error("Failed to connect MongoDB");
    }
}

module.exports = { mongoConnection }