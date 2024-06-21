import { Router } from "express"
import verifyToken from "../../app/Http/Middleware/authMiddleware"
import getDataController from '../../app/Http/Controllers/getDataController';

const router: Router = Router();

router.get("/user", verifyToken, getDataController.user)

export default router;