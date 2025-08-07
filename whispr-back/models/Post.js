import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    authorID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,

      ref: "users",
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 280,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const PostModel = mongoose.model("posts", PostSchema);
