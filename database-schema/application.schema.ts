import { ObjectId } from "mongodb";
import { Schema } from "mongoose";

export const ApplicationSchema = new Schema(
  {
    name: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    amount: { type: Number, required: true },
    profilePic: {
      file: { type: Buffer, required: true },
      fileName: { type: String, required: true },
      mimeType: { type: String, required: true },
    },
    marksSheet: {
      file: { type: Buffer, required: true },
      fileName: { type: String, required: true },
      mimeType: { type: String, required: true },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: ObjectId,
      required: true,
    },
  },
  {
    collection: "application",
    versionKey: false,
  }
);
