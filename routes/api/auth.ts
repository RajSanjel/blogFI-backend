import { Router } from "express"
import AuthController from "../../app/Http/Controllers/authController"
import verifyToken from "../../app/Http/Middleware/authMiddleware"

const router: Router = Router()

router.post("/register", AuthController.register)
router.post("/login", AuthController.login)
router.post("/logout", verifyToken, AuthController.logout)
router.post("/verify", verifyToken, AuthController.verifyLogin)

export default router;