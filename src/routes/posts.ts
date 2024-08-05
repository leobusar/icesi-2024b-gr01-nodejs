import express from "express";
import postController from '../controllers/post.controller';

export const router = express.Router();

router.post("/", postController.create );

router.get("/", postController.getAll);

router.get("/:id", postController.get);

router.put("/:id", postController.update);

router.delete("/:id", postController.delete);
