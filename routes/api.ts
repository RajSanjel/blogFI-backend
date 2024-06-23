import express, { Express } from "express";
import AuthRoutes from "./api/auth";
import GetRoutes from "./api/user";
// import MediaRoutes from "./api/media"
import BlogRoutes from "./api/blogs"
// import multer from "multer";
// const upload = multer({ dest: "public/" })
const api: Express = express()

api.use("/auth", AuthRoutes);
api.use("/users", GetRoutes);
// api.use("/media", upload.single('file'), MediaRoutes);
api.use("/blog", BlogRoutes)
export default api;