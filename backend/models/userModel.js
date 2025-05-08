import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username cannot exceed 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: "Please enter a valid email address",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      validate: {
        validator: function (value) {
          // This will only validate before hashing
          // Strong password: at least 8 chars, one uppercase, one lowercase, one number
          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
            value
          );
        },
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      },
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    preferences: {
      theme: {
        type: String,
        enum: ["light", "dark"],
        default: "light",
      },
      notifications: {
        type: Boolean,
        default: true,
      },
    },
  },
  { timestamps: true }
);

// Pre-save hook for validation
userSchema.pre("validate", function (next) {
  // Skip password validation if password wasn't modified (for updates)
  if (this.isModified("password")) {
    // Password validation is handled by the validator above
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
