import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
        default: () => new mongoose.Types.ObjectId().toString(), // Generate a unique ID
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    }
})


export default mongoose.model("User", UserSchema);