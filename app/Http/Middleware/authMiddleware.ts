import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"
import Users from "../../../models/Users";
dotenv.config()


const publicKey: string = process.env.PUBLIC_KEY;

type User = {
    userid: string
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.authToken
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    try {
        const user = jwt.verify(token, publicKey) as User
        const existingUser = await Users.findOne({ userid: user.userid })
        if (!existingUser) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        next()
    } catch (error) {
        console.log((error as Error).message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export default verifyToken;