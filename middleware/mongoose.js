import mongoose from 'mongoose';

const connectDb = (handler) => async (req, res) => {
    if (mongoose.connections[0].readyState) {
        // Use current db connection
        return handler(req, res);
    }
    // Use new db connection
    await mongoose.connect(process.env.MONGO_URI, {
        // No need for useNewUrlParser and useUnifiedTopology in Mongoose 6+
    });
    return handler(req, res);
};

export default connectDb;
