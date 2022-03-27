import { Router } from "express";
import { handleGetCommunities } from '../controllers/communities';
import { handleGetUsers } from '../controllers/users';
import { handleGetMembers } from '../controllers/members';

const router:Router = Router();

router.get("/api/v1/communities", handleGetCommunities);
router.get("/api/v1/users", handleGetUsers);
router.get("/api/v1/members", handleGetMembers);

export default router;