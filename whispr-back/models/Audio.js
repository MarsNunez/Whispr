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
      enum: ["public", "premium", "hidden"],
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
    // default: "https://cdn-icons-png.flaticon.com/512/12165/12165108.png",
  },
  {
    timestamps: true,
  }
);

export const AudioModel = mongoose.model("audios", AudioSchema);
