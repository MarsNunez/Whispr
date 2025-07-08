import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    // Ejemplo de userName: @user3023902
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

// Middleware que se ejecuta antes de guardar
UserSchema.pre("save", async function (next) {
  // Solo generar userName si no existe (para nuevos usuarios)
  if (!this.userName) {
    try {
      // Limpiar el displayName para crear la base del userName
      let baseUserName = this.displayName
        .toLowerCase()
        .replace(/\s+/g, "") // Quitar espacios
        .replace(/[^a-z0-9]/g, "") // Solo letras y números
        .substring(0, 15); // Limitar longitud

      // Si después de limpiar queda vacío, usar 'user' como base
      if (!baseUserName) {
        baseUserName = "user";
      }

      let userName = `@${baseUserName}`;
      let counter = 1;

      // Verificar si ya existe y agregar números si es necesario
      while (await this.constructor.findOne({ userName })) {
        userName = `@${baseUserName}${counter}`;
        counter++;
      }

      this.userName = userName;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

export const UserModel = mongoose.model("users", UserSchema);
