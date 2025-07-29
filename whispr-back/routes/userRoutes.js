import { Router } from "express";
import { UserModel } from "../models/User.js";
import mongoose from "mongoose";
import { AudioModel } from "../models/Audio.js";
import { PostModel } from "../models/Post.js";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const route = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB límite para imágenes
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Solo se permiten imágenes"), false);
    }
  },
});

route.post("/create", async (req, res) => {
  try {
    const { displayName, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "Email is already registered",
      });
    }

    const newUser = await UserModel.create({
      displayName,
      email,
      password,
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

route.get("/audios/all/:creatorId", async (req, res) => {
  try {
    const { creatorId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(creatorId)) {
      return res.status(400).json({ error: "ID de usuario inválido" });
    }

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

route.get("/posts/all/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await PostModel.find({ authorID: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPosts = await PostModel.countDocuments({ authorID: userId });
    const totalPages = Math.ceil(totalPosts / limit);

    res.json({
      posts,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

route.get("/:userName", async (req, res) => {
  try {
    const { userName } = req.params;
    const user = await UserModel.findOne({ userName });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json({
      id: user._id,
      userName: user.userName,
      displayName: user.displayName,
      email: user.email,
      profilePicture: user.profilePicture,
      following: user.following,
      followersCount: user.followersCount,
      bio: user.bio,
      interestTags: user.interestTags,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

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

// Función para extraer el public_id de la URL de Cloudinary
const getPublicIdFromUrl = (url) => {
  if (!url) return null;
  try {
    const urlParts = url.split("/");
    const uploadIndex = urlParts.indexOf("upload");
    if (uploadIndex !== -1 && uploadIndex + 2 < urlParts.length) {
      const pathParts = urlParts.slice(uploadIndex + 2);
      const fullPath = pathParts.join("/");
      const publicId = fullPath.split(".")[0]; // Elimina la extensión
      console.log("Public_id extraído:", publicId, "URL original:", url);
      return publicId;
    }
    return null;
  } catch (error) {
    console.error("Error extrayendo public_id:", error, "URL:", url);
    return null;
  }
};

// UPDATE - Hacer un update de la imagen de perfil
route.put(
  "/update-profile-picture/:userId",
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      const { userId } = req.params;
      if (!mongoose.isValidObjectId(userId)) {
        return res.status(400).json({ error: "ID de usuario inválido" });
      }

      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      // Actualizar campos del body
      if (req.body.displayName) user.displayName = req.body.displayName;
      if (req.body.bio) user.bio = req.body.bio;
      if (req.body.interestTags)
        user.interestTags = req.body.interestTags
          .split(",")
          .map((tag) => tag.trim());

      // Manejar actualización de userName
      if (req.body.userName) {
        let newUserName = req.body.userName.trim();
        if (!newUserName.startsWith("@")) {
          newUserName = `@${newUserName}`;
        }

        const existingUser = await UserModel.findOne({
          userName: newUserName,
          _id: { $ne: userId },
        });
        if (existingUser) {
          return res.status(400).json({ error: "El userName ya está en uso" });
        }
        user.userName = newUserName;
      }

      // Actualizar imagen si se subió
      if (req.file) {
        // Extraer el public_id de la imagen anterior y eliminarla de Cloudinary
        if (user.profilePicture) {
          const oldPublicId = getPublicIdFromUrl(user.profilePicture);
          if (oldPublicId) {
            try {
              const destroyResult = await cloudinary.uploader.destroy(
                oldPublicId,
                {
                  resource_type: "image",
                }
              );
              console.log(`Resultado de eliminación:`, destroyResult);
              if (destroyResult.result === "ok") {
                console.log(`Imagen anterior eliminada: ${oldPublicId}`);
              } else {
                console.warn(
                  `No se pudo eliminar la imagen: ${oldPublicId}, Resultado: ${destroyResult.result}`
                );
              }
            } catch (destroyError) {
              console.error(
                `Error al eliminar la imagen ${oldPublicId}:`,
                destroyError
              );
            }
          } else {
            console.warn(
              "No se pudo extraer el public_id de la URL:",
              user.profilePicture
            );
          }
        }

        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                resource_type: "image",
                folder: "profile-pictures",
                public_id: `user_${userId}_${Date.now()}`,
              },
              (error, result) => (error ? reject(error) : resolve(result))
            )
            .end(req.file.buffer);
        });
        user.profilePicture = result.secure_url;
      }

      await user.save();
      res.status(200).json({
        message: "Perfil actualizado exitosamente",
        profilePicture: user.profilePicture,
        displayName: user.displayName,
        bio: user.bio,
        interestTags: user.interestTags,
        userName: user.userName,
      });
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      if (error.code === 11000) {
        return res.status(400).json({ error: "El userName ya está en uso" });
      }
      res.status(400).json({ error: error.message });
    }
  }
);

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
