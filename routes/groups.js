import { Router } from "express";
import {
  createGroup,
  getAllGroups,
  searchGroup,
  updateGroup,
} from "../controllers/groupController.js";

const router = Router();

router.post("/createGroup", createGroup);
router.get("/getAllGroups", getAllGroups);
router.get("/searchGroup", searchGroup);
router.put("/updateGroup?:groupId", updateGroup);
export default router;
