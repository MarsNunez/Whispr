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

// // Método para incrementar likes
// PostSchema.methods.incrementLike = function () {
//   this.likeCount += 1;
//   return this.save();
// };

// // Método para decrementar likes
// PostSchema.methods.decrementLike = function () {
//   if (this.likeCount > 0) {
//     this.likeCount -= 1;
//   }
//   return this.save();
// };

export const PostModel = mongoose.model("posts", PostSchema);
