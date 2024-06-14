import { Request } from "express"
import { v2 as cloudinary } from 'cloudinary'
import dotenv from "dotenv"
import fs from "fs"
dotenv.config()
cloudinary.config({
    cloud_name: "dnfarkwtx",
    api_key: process.env.API_KEY,
    api_secret: process.env.API_KEY_SECRET_KEY
})

export async function uploadBlogImage(req: Request) {
    const img_url = await req.body.img_url;
    const file = req.file.path;
    if (!file && !img_url) {
        return { isSuccess: false, msg: "Invalid file" }
    }
    if (img_url) {
        try {
            const result = await cloudinary.uploader.upload(img_url, {
                folder: "blogFi",
                resource_type: "image",
                transformation: [
                    { responsive: true }
                ],
            })
            return { isSuccess: true, msg: "Image Uploaded", img_url: result.secure_url }
        }
        catch (err) {
            console.log(err)
            return { isSuccess: false, msg: "Internal Server Error" }
        }
    }

    try {
        const result = await cloudinary.uploader.upload(file, {
            folder: "blogFi",
            resource_type: "image",
            transformation: [
                { responsive: true }
            ],
        })
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error("Error deleting file from server:", err);
            }
        });

        return { isSuccess: true, msg: "Image Uploaded", img_url: result.secure_url }
    }
    catch (err) {
        console.log(err)
        return { isSuccess: false, msg: "Internal Server Error" }
    }

}
