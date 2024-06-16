import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import apiRoutes from "./routes/api"
dotenv.config()
import cookieParser from "cookie-parser"
const app = express()
const PORT = process.env.PORT || 3000


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/", cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    optionsSuccessStatus: 204,
}));
app.use(cookieParser());

mongoose.connect(process.env.MONGO_DB_URI).then(() => {
    console.log("Database Connected...")
}).catch(err => {
    console.log("Error connecting to db...\n");
    console.log(err)
})

app.get("/", (req, res) => {
    res.status(200).json({ "message": "Ready...." })
})

app.use("/api", apiRoutes);


app.listen(PORT, () => {
    console.log("Server is ready at port: " + PORT)
})