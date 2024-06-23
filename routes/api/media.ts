import { Router } from "express"
// import ImageController from "../../app/Http/Controllers/EmbedController"

const router: Router = Router()

// router.post("/upload", ImageController.upload);
router.get("/", (req, res) => {
    res.status(200).json({ message: "Media Server is currently being worked on." })
})
export default router;