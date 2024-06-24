import { Router } from "express"
import BlogController from "../../app/Http/Controllers/BlogController"
import verifyToken from "../../app/Http/Middleware/authMiddleware"

const router: Router = Router()

router.post("/post", verifyToken, BlogController.postBlog)
router.get("/getBlog/:url", BlogController.getBlog)
router.get("/getBlogs", BlogController.getBlogs)
router.post("/delete", verifyToken, BlogController.deleteBlog)

export default router;