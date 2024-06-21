import { Request, response } from "express";
import Blogs from "../../models/Blogs";
import Users from "../../models/Users"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

type Decoded = {
    userid: string
}

const publicKey = process.env.PUBLIC_KEY;
const jwtDecode = (token: string) => {
    const decoded = jwt.verify(token, publicKey)
    return decoded;
}


export async function postBlog(req: Request) {
    const { title, content, url } = req.body;
    const token = req.cookies.authToken;
    if (!token) {
        return { statusCode: 403, isSuccess: false, message: "Unauthorized" }
    }
    if (!title || !content || !url) {
        return { isSuccess: false, message: "Something's missing" };
    }
    try {
        const decoded = jwtDecode(token) as Decoded;
        const { userid } = decoded;
        const user = await Users.findOne({ userid })
        if (!user) {
            return { isSuccess: false, message: "Invalid Users" };
        }
        const blog = new Blogs({ userid, url, content, title });
        await blog.save()
        return { isSuccess: true, message: "Blogs Saved!" }
    } catch (error) {
        console.log((error as Error).message);
        return { isSuccess: false, message: "Internal Server Error" };
    }
}

export async function getBlog(req: Request) {
    const params = req.params
    if (!params) {
        return { isSuccess: false, message: "No blog found" }
    }
    try {
        const blog = await Blogs.findOne(params).lean()
        const user = await Users.findOne({ userid: blog.userid });
        if (!blog) {
            return { isSuccess: false, message: "No blog found" }
        }
        delete blog._id;
        delete blog.blogid;
        delete blog.userid;
        return { isSuccess: true, message: { ...blog, author: user.name } }
    } catch (error) {
        console.log((error as Error).message)
        return { isSuccess: false, message: "Internal server errror" }
    }
}
export async function getBlogs(req: Request) {
    try {
        const blogs = await Blogs.find({}).lean();
        const responseBlog = await Promise.all(blogs.map(async (blog) => {
            const user = await Users.findOne({ userid: blog.userid }).lean();
            if (user) {
                return {
                    ...blog,
                    author: user.name
                };
            }
        }));

        const sanitizedResponse = responseBlog.map(({ _id, blogid, userid, ...rest }) => rest);

        return { isSuccess: true, message: sanitizedResponse };
    } catch (error) {
        console.log((error as Error).message);
        return { isSuccess: false, message: "Internal server error" };
    }
}