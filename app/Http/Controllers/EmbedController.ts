import { Request, Response } from "express"
import * as ImageProvider from "../../Providers/images"


const ImageController = {
    upload: async (req: Request, res: Response) => {
        const ImageData = await ImageProvider.uploadBlogImage(req) as any;
        try {
            if (!ImageData?.isSuccess) {
                return res.status(400).json({ msg: ImageData.msg })
            }
            return res.status(200).json({ msg: ImageData.msg, img_url: ImageData.img_url })
        } catch (err) {
            console.log(err)
        }

    }
}

export default ImageController