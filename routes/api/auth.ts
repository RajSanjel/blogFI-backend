import { Router } from "express"
import AuthController from "../../app/Http/Controllers/authController"

const router: Router = Router()


router.post("/register", AuthController.register)


export default router;