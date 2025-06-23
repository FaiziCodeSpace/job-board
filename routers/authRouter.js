import { Router } from "express";
import { getIndexPage, getLoginPage, getRegisterPage, loginUser, registerUser} from "../controllers/authController.js";
const router = Router();

// PAGES ACCESS 
router.get('/', getIndexPage);
router.get('/login', getLoginPage);
router.get('/register', getRegisterPage);

// PAGES AUTHORIZATION
router.post('/registerUser', registerUser)
router.post('/loginUser', loginUser);

export default router;