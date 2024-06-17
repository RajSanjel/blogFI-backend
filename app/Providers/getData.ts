import { Request } from "express";
import Users from "../../models/Users";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const publicKey = process.env.PUBLIC_KEY;

type Decoded = {
    userid: string
}

export async function user(req: Request) {
    const token = req.cookies.authToken;
    if (!token) {
        return { isSuccess: false, statusCode: 401, msg: "Unauthorized" };
    }
    try {
        const decoded = jwt.verify(token, publicKey) as Decoded;
        const user = await Users.findOne({ userid: decoded.userid }).lean()
        delete user.password;
        delete user._id;
        return { isSuccess: true, msg: { user }, }

    } catch (error) {
        console.log((error as Error).message)
        return { isSuccess: false, msg: "Internal Sever Error" }
    }

}

