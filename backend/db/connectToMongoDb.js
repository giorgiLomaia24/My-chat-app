import mongoose from "mongoose";

const connectToMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log('connected to mongo db');
    } catch (error) {
        console.log(`connection failed due to ${error.message}`);
    }
}

export default connectToMongoDb;