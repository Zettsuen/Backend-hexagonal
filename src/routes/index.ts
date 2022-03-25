import { Router } from "express";
import { handleGetCommunities } from '../controllers/communities';

const router:Router = Router();

router.get("/api/v1/communities", handleGetCommunities);

export default router;