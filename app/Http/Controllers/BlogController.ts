import { Request, Response } from "express";
import * as blogProvider from "../../Providers/blog"
const BlogController = {
    postBlog: async (req: Request, res: Response) => {
        try {

            const blogData = await blogProvider.postBlog(req)
            if (!blogData.isSuccess) {
                return res.status(400).json({ message: blogData.message })
            }
            return res.status(200).json({ message: blogData.message })
        } catch (error) {
            console.log((error as Error).message);
            return res.status(500).json({ message: "Internal Server Error" })
        }
    },
    getBlog: async (req: Request, res: Response) => {
        try {
            const blogData = await blogProvider.getBlog(req)
            if (!blogData.isSuccess) {
                return res.status(400).json({ message: blogData.message })
            }
            return res.status(200).json({ message: blogData.message })
        } catch (error) {
            console.log((error as Error).message);
            return res.status(500).json({ message: "Internal Server Error" })
        }
    },
    getBlogs: async (req: Request, res: Response) => {
        try {
            const blogData = await blogProvider.getBlogs(req)
            if (!blogData.isSuccess) {
                return res.status(400).json({ message: blogData.message })
            }
            return res.status(200).json({ message: blogData.message })
        } catch (error) {
            console.log((error as Error).message);
            return res.status(500).json({ message: "Internal Server Error" })
        }
    },
    deleteBlog: async (req: Request, res: Response) => {
        try {
            const blogData = await blogProvider.deleteBlog(req);
            if (!blogData.isSuccess) {
                return res.status(400).json({ message: blogData.message });
            }
            return res.status(200).json({ message: blogData.message })
        } catch (error) {
            console.log((error as Error).message)
            return res.status(500).json({ message: "Internal Server Error" })
        }
    }
}

export default BlogController;