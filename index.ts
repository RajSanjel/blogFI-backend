import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import apiRoutes from "./routes/api"
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
app.use("/", cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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