import { Router } from "express";
import {
  createUser,
  getAllNewUsers,
  getAllUsers,
  getUser,
  login,
  searchUsers,
  updateUser,
  updateUserStatus,
} from "../controllers/userController.js";

const router = Router();

router.get("/getAllUsers", getAllUsers);
router.get("/getAllNewUsers", getAllNewUsers);
router.post("/createUser", createUser);
router.put("/updateUser", updateUser);
router.put("/updateUser/status?:userId", updateUserStatus);
router.get("/searchUsers", searchUsers);
router.get("/getUser?:userId", getUser);
router.post("/login", login);
export default router;
