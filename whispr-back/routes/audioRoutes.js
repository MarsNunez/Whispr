import { Router } from "express";
import { AudioModel } from "../models/Audio.js";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import mongoose from "mongoose";

const route = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("audio/")) {
      cb(null, true);
    } else {
      cb(new Error("Solo archivos de audio permitidos"), false);
    }
  },
});

route.post("/create", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No se subió ningún archivo" });
    }

    // Subir a Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "video", // Para archivos de audio
            folder: "whispr-audios",
            public_id: `audio_${Date.now()}`,
          },
          (error, result) => {
            if (error) {
              console.error("Error Cloudinary:", error);
              reject(error);
            } else {
              console.log("Upload exitoso:", result.secure_url);
              resolve(result);
            }
          }
        )
        .end(req.file.buffer);
    });

    let tags = [];
    if (req.body.tags) {
      if (Array.isArray(req.body.tags)) {
        tags = req.body.tags; // Ya es array
      } else {
        tags = req.body.tags.split(","); // String separado por comas
      }
    }

    const audioData = {
      creatorId: req.body.creatorId,
      title: req.body.title || req.file.originalname,
      description: req.body.description || "",
      audioUrl: result.secure_url,
      duration: result.duration || 0,
      tags: tags, // Array procesado
      visibility: req.body.visibility || "public",
      price: req.body.price || 0,
    };

    const newAudio = await AudioModel.create(audioData);

    res.status(201).json({
      message: "Audio subido exitosamente",
      audio: newAudio,
      cloudinaryData: {
        url: result.secure_url,
        duration: result.duration,
        format: result.format,
        bytes: result.bytes,
      },
    });
  } catch (error) {
    console.error("Error completo:", error);
    res.status(400).json({ error: error.message });
  }
});

// DELTE - Ruta para eliminar audio por MongoDB ID
route.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validar que el ID sea válido de MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "ID de audio inválido",
      });
    }

    // Buscar el audio en la base de datos
    const audio = await AudioModel.findById(id);

    if (!audio) {
      return res.status(404).json({
        success: false,
        message: "Audio no encontrado",
      });
    }

    // Extraer el public_id de Cloudinary desde la URL
    let publicId = null;
    if (audio.audioUrl) {
      // Extraer el public_id de la URL de Cloudinary
      // Ejemplo URL: https://res.cloudinary.com/your-cloud/video/upload/v1234567890/audio_id.mp3
      const urlParts = audio.audioUrl.split("/");
      const uploadIndex = urlParts.indexOf("upload");

      if (uploadIndex !== -1 && uploadIndex + 2 < urlParts.length) {
        // Obtener todo después de 'upload/v1234567890/'
        const pathParts = urlParts.slice(uploadIndex + 2);
        const fullPath = pathParts.join("/");
        // Remover la extensión del archivo
        publicId = fullPath.split(".")[0];
      }
    }

    // Eliminar de Cloudinary si existe publicId
    if (publicId) {
      try {
        const cloudinaryResult = await cloudinary.uploader.destroy(publicId, {
          resource_type: "video",
        });
        console.log(
          `Audio eliminado de Cloudinary: ${publicId}`,
          cloudinaryResult
        );
      } catch (cloudinaryError) {
        console.error("Error al eliminar de Cloudinary:", cloudinaryError);
        // Continuar con la eliminación de la base de datos aunque falle Cloudinary
      }
    }

    // Eliminar de la base de datos usando el MongoDB ID
    await AudioModel.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Audio eliminado exitosamente",
      data: {
        id: audio._id,
        title: audio.title,
      },
    });
  } catch (error) {
    console.error("Error al eliminar audio:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor",
      error: error.message,
    });
  }
});

// UPDATE - Actualizar un audio por ID (con o sin archivo)
route.put("/:id", upload.single("audio"), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Buscar el audio existente
    const existingAudio = await AudioModel.findById(id);
    if (!existingAudio) {
      return res.status(404).json({ error: "Audio no encontrado" });
    }

    // Si se subió un nuevo archivo de audio
    if (req.file) {
      // Extraer el public_id del audio anterior para eliminarlo
      let oldPublicId = null;
      if (existingAudio.audioUrl) {
        const urlParts = existingAudio.audioUrl.split("/");
        const uploadIndex = urlParts.indexOf("upload");

        if (uploadIndex !== -1 && uploadIndex + 2 < urlParts.length) {
          const pathParts = urlParts.slice(uploadIndex + 2);
          const fullPath = pathParts.join("/");
          oldPublicId = fullPath.split(".")[0];
        }
      }

      // Subir el nuevo audio a Cloudinary
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "video",
              folder: "whispr-audios",
              public_id: `audio_${Date.now()}`,
            },
            (error, result) => {
              if (error) {
                console.error("Error Cloudinary:", error);
                reject(error);
              } else {
                console.log("Upload exitoso:", result.secure_url);
                resolve(result);
              }
            }
          )
          .end(req.file.buffer);
      });

      // Eliminar el audio anterior de Cloudinary
      if (oldPublicId) {
        try {
          const deleteResult = await cloudinary.uploader.destroy(oldPublicId, {
            resource_type: "video",
          });
          console.log(`Audio anterior eliminado de Cloudinary: ${oldPublicId}`);
        } catch (cloudinaryError) {
          console.error("Error al eliminar audio anterior:", cloudinaryError);
        }
      }

      // Actualizar con los nuevos datos del audio
      updateData.audioUrl = result.secure_url;
      updateData.duration = result.duration || 0;
    }

    // Procesar tags si vienen en el body
    if (updateData.tags) {
      if (Array.isArray(updateData.tags)) {
        updateData.tags = updateData.tags; // Ya es array
      } else {
        updateData.tags = updateData.tags.split(",").map((tag) => tag.trim()); // String separado por comas
      }
    }

    const updatedAudio = await AudioModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedAudio) {
      return res.status(404).json({ error: "Audio no encontrado" });
    }

    res.status(200).json(updatedAudio);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

export { route as audioRouter };
