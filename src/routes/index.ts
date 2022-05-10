import { Router } from "express";
import { handleGetUsers } from '../controllers/users';
import { handleGetMembers } from '../controllers/members';
import { handleGetCommunities } from '../controllers/communities';
import { checkRoleAccess } from '../middlewares/CheckRoleAccess';

const router:Router = Router();

router.get("/v1/authorized/memberNeeded/communities", handleGetCommunities);
router.get("/v1/authorized/memberNeeded/users", handleGetUsers);
router.get("/v1/authorized/memberNeeded/members", handleGetMembers);

export default router;