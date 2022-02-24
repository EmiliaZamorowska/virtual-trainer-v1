import mongoose from "mongoose";
import ExerciseModel from "../models/exercise.js";

export const getExercises = async (req, res) => {
  try {
    const ExerciseModels = await ExerciseModel.find();
    res.status(200).json(ExerciseModels);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createExercise = async (req, res) => {
  const ex = req.body;
  const newEx = new ExerciseModel({ ...ex, creator: req.userId });
  try {
    await newEx.save();
    res.status(201).json(newEx);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateExercise = async (req, res) => {
  const { id: _id } = req.params;
  const ex = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Nieprawidłowe ćwiczenie");

  //do modelu przekazujemy {_id, }
  const updatedEx = await ExerciseModel.findByIdAndUpdate(
    _id,
    { ...ex, _id },
    { new: true }
  );
  res.json(updatedEx);
};

export const deleteExercise = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Nieprawidłowe ćwiczenie");

  const deleteEx = await ExerciseModel.findByIdAndRemove(_id);
  res.json({ message: "Ćwiczenie usunięte" });
};
