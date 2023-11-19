import { Response, Request } from "express";
import { UserSchema } from "../database-schema/user.schema";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const jwt = require("jsonwebtoken");

let User = mongoose.model("user", UserSchema);

export const registerUser = async (req: any, res: any) => {
  try {
    let userRes: any = await User.findOne({
      email: req.body.email,
    });
    if (userRes) {
      return res.status(401).json({ message: "Email id Already registered." });
    }
    var newUser = new User(req.body);
    newUser.hash_password = await bcrypt.hash(req.body.password, 10);

    let result: any = await newUser.save();
    if (result) {
      newUser.hash_password = undefined;
      return res.json({
        result: result,
        token: jwt.sign(
          { email: result.email, name: result.name, _id: result._id },
          "P@55w0rd"
        ),
      });
    } else {
      throw new Error("Failed to create user");
    }
  } catch (err) {
    return res.status(400).send({
      message: err,
    });
  }
};

export const signIn = async (req: any, res: any) => {
  try {
    let userRes: any = await User.findOne({
      email: req.body.email,
    });

    if (userRes) {
      console.log("userRes", userRes);
      if (!(await bcrypt.compare(req.body.password, userRes.hash_password))) {
        return res.status(401).json({
          message: "Authentication failed. Invalid user or password.",
        });
      }
      return res.json({
        token: jwt.sign(
          { email: userRes.email, name: userRes.name, _id: userRes._id },
          "P@55w0rd"
        ),
      });
    }
    return res.status(401).json({ message: "user not found, Please register" });
  } catch (err) {
    console.log("err", err);
    return res.status(401).json({ message: "Some thing went wrong try later" });
  }
};

export const loginRequired = async (req: any, res: any, next: any) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized user!!" });
  }
};

// const comparePassword = async (password: any, hash_password: any) => {
//   let match = ;
//   console.log("match", match);
//   return match;
// };
