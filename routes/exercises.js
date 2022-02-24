import express from "express";
import auth from "../middleware/auth.js";
import {
  getExercises,
  createExercise,
  updateExercise,
  deleteExercise,
} from "../controllers/exercises.js";

//tutaj uzywamy middleware dodajac przed czynnoscia wymagajaca sprawdzenia uzytkownika auth
const router = express.Router();
router.get("/", getExercises);
router.post("/", createExercise);
router.patch("/:id", auth, updateExercise); //patch - updating existing documents
router.delete("/:id", auth, deleteExercise);

export default router;
