import * as AuthProvider from "../../Providers/auth";
import { Request, Response } from "express";


const AuthController = {
    register: async (req: Request, res: Response) => {
        try {
            const registerData = (await AuthProvider.register(req)) as any;
            if (!registerData?.isSuccess) {
                return res.status(400).json({ msg: registerData.msg });
            }
            return res.status(200).json({ msg: "registerData.msg" });
        } catch (error) {
            console.error((error as Error).message);
            return res.status(500).json({ msg: "Server Error" });
        }
    },
}

export default AuthController;