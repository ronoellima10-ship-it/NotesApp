
import mongoose from 'mongoose';

 process.env.MONGO_URI;

const conectDB = async () => {
 try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB');
 } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process with an error code
 }

}

export default conectDB;