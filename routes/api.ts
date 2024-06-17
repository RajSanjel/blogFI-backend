import express, { Express } from "express";
import AuthRoutes from "./api/auth";
import GetRoutes from "./api/get";
import MediaRoutes from "./api/media"
import multer from "multer";
const upload = multer({ dest: "public/" })
const api: Express = express()

api.use("/auth", AuthRoutes);
api.use("/get", GetRoutes);
api.use("/media", upload.single('file'), MediaRoutes);
export default api;