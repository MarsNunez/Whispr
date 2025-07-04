import mongoose from "mongoose";

const AudioSchema = mongoose.Schema(
  {
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    audioUrl: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 0,
    },
    tags: [String],
    visibility: {
      type: String,
      enum: ["public", "premium", "private"],
      default: "public",
    },
    price: {
      type: Number,
      default: 0,
    },
    playCount: {
      type: Number,
      default: 0,
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

export const AudioModel = mongoose.model("audios", AudioSchema);
