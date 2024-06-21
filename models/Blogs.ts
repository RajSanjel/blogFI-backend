import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    blogid: {
        type: String,
        default: () => new mongoose.Types.ObjectId().toString(), // Generate a unique ID
        unique: true,
        required: true
    },
    userid: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    postedOn: {
        type: Date,
        default: Date.now,
    }
})


export default mongoose.model("Blogs", BlogSchema);