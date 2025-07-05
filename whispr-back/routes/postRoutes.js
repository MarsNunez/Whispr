import { Router } from "express";
import { PostModel } from "../models/Post.js";

const route = Router();

// CREATE - Crear un nuevo post
route.post("/create", async (req, res) => {
  try {
    const { authorID, content, imageUrl } = req.body;

    // Validar campos requeridos
    if (!authorID || !content) {
      return res.status(400).json({
        error: "authorID y content son requeridos",
      });
    }

    const newPost = new PostModel({
      authorID,
      content,
      imageUrl,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET - Obtener un post específico por ID
route.get("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await PostModel.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    res.json(post);
  } catch (error) {
    // Si el ID no es válido de MongoDB
    if (error.name === "CastError") {
      return res.status(400).json({ error: "ID de post inválido" });
    }
    res.status(500).json({ error: error.message });
  }
});

// UPDATE - Actualizar un post
route.put("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, imageUrl } = req.body;

    const updateData = {};
    if (content) updateData.content = content;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl; // Permite eliminar imagen enviando string vacío

    const updatedPost = await PostModel.findByIdAndUpdate(postId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedPost) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    res.json(updatedPost);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "ID de post inválido" });
    }
    res.status(400).json({ error: error.message });
  }
});

// DELETE - Eliminar un post
route.delete("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;

    const deletedPost = await PostModel.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({
      message: "Post deleted successfuly",
      deletedPost,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid post ID" });
    }
    res.status(500).json({ error: error.message });
  }
});

// PATCH - Incrementar likes
route.patch("/:postId/like", async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await PostModel.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    // En lugar de post.incrementLike()
    post.likeCount += 1;
    await post.save();

    res.json(post);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "ID de post inválido" });
    }
    res.status(500).json({ error: error.message });
  }
});

// PATCH - Incrementar likes
route.patch("/:postId/dislike", async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await PostModel.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    // En lugar de post.incrementLike()
    if (post.likeCount > 0) {
      post.likeCount -= 1;
    }

    await post.save();
    res.json(post);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "ID de post inválido" });
    }
    res.status(500).json({ error: error.message });
  }
});

export { route as postRouter };
