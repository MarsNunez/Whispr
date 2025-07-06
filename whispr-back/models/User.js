import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    // @strange_90
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    bio: String,
    profilePicture: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1426692001/vector/cute-funny-halloween-ghost-scary-design-illustration-childish-spooky-boo-character-for-kids.jpg?s=612x612&w=0&k=20&c=y08yBlCL0efHrKQrXqA78ql0_LAcb5_0y92IHLxpYKU=",
    },
    // Usuarios que siguen a este usuario
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    // Usuarios que este usuario sigue
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    // Contadores para optimizar consultas
    followersCount: {
      type: Number,
      default: 0,
    },
    interestTags: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("users", UserSchema);
