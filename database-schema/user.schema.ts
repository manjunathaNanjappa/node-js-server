import { Schema } from "mongoose";
const bcrypt = require("bcrypt");

export const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    hash_password: {
      type: String,
    },
    created: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "users",
    versionKey: false,
  }
);

UserSchema.methods.comparePassword = function (password: any) {
  return bcrypt.compareSync(password, this.hash_password);
};
