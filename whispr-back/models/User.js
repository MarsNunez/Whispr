import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
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
// Hash password before saving
UserSchema.pre("save", async function (next) {
  try {
    // Only hash password if it has been modified (or is new)
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }

    // Generate username if not exists
    if (!this.userName) {
      let baseUserName = this.displayName
        .toLowerCase()
        .replace(/\s+/g, "")
        .replace(/[^a-z0-9]/g, "")
        .substring(0, 15);

      if (!baseUserName) {
        baseUserName = "user";
      }

      let userName = `@${baseUserName}`;
      let counter = 1;

      while (await this.constructor.findOne({ userName })) {
        userName = `@${baseUserName}${counter}`;
        counter++;
      }
      this.userName = userName;
    }
    next();
  } catch (error) {
    next(error);
  }
});

export const UserModel = mongoose.model("users", UserSchema);
