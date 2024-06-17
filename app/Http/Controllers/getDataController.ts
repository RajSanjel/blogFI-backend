import * as getDataProvider from "../../Providers/getData";
import { Request, Response } from "express";

const getDataController = {
    user: async (req: Request, res: Response) => {
        try {
            const userData = await getDataProvider.user(req);
            if (!userData.isSuccess) {
                return res.status(userData?.statusCode || 400).json({ msg: userData.msg });
            }
            return res.status(200).json({ msg: userData.msg });
        } catch (error) {
            console.error((error as Error).message);
            return res.status(500).json({ msg: "Internal Server Error" });
        }
    },
}

export default getDataController;