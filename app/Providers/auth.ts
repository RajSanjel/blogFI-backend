import Users from "../../models/Users"
import { Request, Response } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();

const privateKey = process.env.PRIVATE_KEY

const GenerateJwtToken = ({ id }: { id: string }) => {
    const token = jwt.sign({ userid: id }, privateKey, { expiresIn: 36000, algorithm: "RS512" })
    return token;
}

export async function register(req: Request) {
    try {
        const { email, username, fullName, password } = req.body;
        const existingUser = await Users.findOne({ $or: [{ email }, { username }] })
        if (existingUser) {
            return { msg: "User Already Exists" }
        }
        if (!email || !username || !fullName || !password) {
            return { msg: "Unauthorized" }
        }
        const user = new Users({ email, username, password, fullName });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save()
        return {
            isSuccess: true,
            msg: "Registration successful!"
        };
    } catch (error) {
        console.log(error)
        return { msg: "Internal Server Error" };
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
        console.log(password);
        console.log(user.password)
        const isMatch = await bcrypt.compare(password, user.password)
        console.log(isMatch)
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
