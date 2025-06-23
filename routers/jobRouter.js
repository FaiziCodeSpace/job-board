import { Router } from "express";
import { getshowJobs, createJob } from "../controllers/jobController.js";
import authMiddleware from "../middleware/authmiddleware.js";
const router = Router();


router.get('/jobBoard', authMiddleware, getshowJobs);
router.post('/createJob', createJob);



export default router;
