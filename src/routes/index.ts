import { Router } from "express";
import { handleGetUsers } from '../controllers/users';
import { handleGetMembers } from '../controllers/members';
import { handleGetCommunities } from '../controllers/communities';
import { checkRoleAccess } from '../middlewares/CheckRoleAccess';

const router:Router = Router();

router.get("/api/v1/communities", handleGetCommunities);
router.get("/api/v1/users", handleGetUsers);
router.get("/api/v1/members", handleGetMembers);

export default router;