import Users from "../../models/Users"
import { Request, Response } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();

const privateKey = process.env.PRIVATE_KEY
const publicKey = process.env.PUBLIC_KEY;
const GenerateJwtToken = ({ id }: { id: string }) => {
    const token = jwt.sign({ userid: id }, privateKey, { algorithm: "RS512" })
    return token;
}

type Decoded = {
    userid: string
}

export async function register(req: Request) {
    try {
        const { email, username, name, password } = req.body;
        const existingUser = await Users.findOne({ $or: [{ email }, { username }] })
        if (existingUser) {
            return { isSuccess: false, msg: "User Already Exists" }
        }
        if (!email || !username || !name || !password) {
            return { isSuccess: false, msg: "Unauthorized" }
        }
        const user = new Users({ email, username, password, name });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save()
        return {
            isSuccess: true,
            msg: "Registration successful!"
        };
    } catch (error) {
        console.log(error)
        return { isSuccess: false, msg: "Internal Server Error" };
    }
}

export async function login(req: Request) {
    try {
        const { emailOrUsername, password } = req.body;
        if (!emailOrUsername) {
            return { isSuccess: false, msg: "Invalid Credentials" };
        }
        const user = await Users.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] })
        if (!user) {
            return { isSuccess: false, msg: "Invalid Credentials" };
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return { isSuccess: false, msg: "Invalid Credentials" };
        }
        const jwtToken = GenerateJwtToken({ id: user.userid })
        return { isSuccess: true, msg: jwtToken };
    } catch (err) {
        console.log(err)
        return { isSuccess: false, msg: "Internal Server Error" }
    }

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