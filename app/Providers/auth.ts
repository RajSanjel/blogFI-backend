import Users from "../../models/Users"
import { Request } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();

const privateKey = process.env.PRIVATE_KEY
const GenerateJwtToken = ({ id }: { id: string }) => {
    const token = jwt.sign({ userid: id }, privateKey, { algorithm: "RS512" })
    return token;
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
        const newUser = await Users.findOne({ $or: [{ email: user.email }, { username: user.username }] })
        if (!newUser) {
            return { isSuccess: false, msg: "There was error creating session" }
        }
        const jwtToken = GenerateJwtToken({ id: newUser.userid })
        return {
            isSuccess: true,
            msg: "Registration successful!",
            token: jwtToken
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

export async function logout(req: Request) {
    const token = req.cookies.authToken;
    if (!token) {
        return { isSuccess: false, statusCode: 401, msg: "Unauthorized" };
    }
    return { isSuccess: true, msg: token }
}

export async function verifyLogin(req: Request) {
    const token = req.cookies.authToken;
    if (!token) {
        return { isSuccess: false, statusCode: 401, msg: "Unauthorized" }
    }
    return { isSuccess: true, msg: "User is Logged In" };
}