import { Application } from "express";
import {
  loginRequired,
  registerUser,
  signIn,
} from "../handelers/user.controllers";
import {
  createNewApplication,
  deleteApplication,
  getAllApplicationData,
  getAnApplicationDetails,
} from "../handelers/application.controllers";

export const mainRouter = (app: Application) => {
  app.route("/fetchApplicationList").post(loginRequired, getAllApplicationData);
  app.route("/deleteApplication").post(loginRequired, deleteApplication);
  app.route("/createNewApplication").post(loginRequired, createNewApplication);
  app.route("/auth/register").post(registerUser);
  app.route("/auth/sign_in").post(signIn);
};
