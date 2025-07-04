import { Router } from "express";
import { UserModel } from "../models/User.js";
import mongoose from "mongoose";
import { AudioModel } from "../models/Audio.js";

const route = Router();

route.post("/create", async (req, res) => {
  try {
    const {
      userName,
      email,
      password,
      displayName,
      bio,
      profilePicture,
      followers,
      interestTags,
    } = req.body;

    const newUser = await UserModel.create({
      userName,
      email,
      password,
      displayName,
      bio,
      profilePicture,
      followers,
      interestTags,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

route.get("/", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// GET - Obtener todos los audios de un usuario
route.get("/audios/:creatorId", async (req, res) => {
  try {
    const { creatorId } = req.params;

    // Validar que el creatorId sea válido de MongoDB
    if (!mongoose.Types.ObjectId.isValid(creatorId)) {
      return res.status(400).json({ error: "ID de usuario inválido" });
    }

    // Buscar todos los audios del usuario
    const audios = await AudioModel.find({ creatorId: creatorId });

    res.status(200).json({
      count: audios.length,
      data: audios,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

// GET - Obtener un usuario por ID
route.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// UPDATE - Actualizar un usuario por ID
route.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

// DELETE - Eliminar un usuario por ID
route.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json({
      message: "Usuario eliminado exitosamente",
      user: deletedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

export { route as userRouter };
