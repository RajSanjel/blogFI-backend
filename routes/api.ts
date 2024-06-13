import express, { Express } from "express";
import AuthRoutes from "./api/auth";
import MediaRoutes from "./api/media"

const api: Express = express()

api.use("/auth", AuthRoutes);
api.use("/media", MediaRoutes);
export default api;