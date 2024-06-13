import { Request, Response } from "express"
import Image from "../../models/BlogEmbed"
import { v2 as cloudinary } from 'cloudinary'
import dotenv from "dotenv"

dotenv.config()
cloudinary.config({
    cloud_name: "dnfarkwtx",
    api_key: process.env.API_KEY,
    api_secret: process.env.API_KEY_SECRET_KEY
})

export async function uploadBlogImage(req: Request) {
    const { img_url } = req.body;

    if (!img_url) {
        return { isSuccess: false, msg: "Invalid Image" }
    }
    try {
        await cloudinary.uploader.upload(img_url, {
            folder: "blogFi",
            resource_type: "image",
        }).then(result => {
            console.log()
            return { isSuccess: true, msg: "Image Uploaded", img_url: result.secure_url }
        }
        )


    }
    catch (err) {
        console.log(err)
        return { isSuccess: false, msg: "Internal Server Error" }
    }
}
