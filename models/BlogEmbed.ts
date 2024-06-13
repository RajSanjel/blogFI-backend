import mongoose from "mongoose";

const BlogEmbedSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}
)

export default BlogEmbedSchema;