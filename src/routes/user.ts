import express from "express";
import userController from '../controllers/user.controller';

export const router = express.Router();

router.post("/", userController.create );

router.get("/", userController.getAll);

router.get("/:id", userController.get);

router.put("/:id", userController.update);

router.delete("/:id", userController.delete);
