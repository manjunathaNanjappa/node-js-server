import mongoose from "mongoose";
import { ApplicationSchema } from "../database-schema/application.schema";

let ApplicationModel = mongoose.model("application", ApplicationSchema);

export const getAllApplicationData = async (req: any, res: any) => {
  try {
    if (req.user) {
      let result = await ApplicationModel.find({
        createdBy: req.user._id,
      });
      if (result) {
        let listOfApplication = result.map((data: any) => {
          if (data.profilePic?.file) {
            data.profilePic = {
              ...data.profilePic,
              file: Buffer.from(data.profilePic?.file, "binary").toString(
                "base64"
              ),
            };
          }
          if (data.marksSheet?.file) {
            data.marksSheet = {
              ...data.marksSheet,
              file: Buffer.from(data.marksSheet?.file, "binary").toString(
                "base64"
              ),
            };
          }
          return data;
        });
        return res.json(listOfApplication);
      } else {
        throw new Error("Failed to fetch data");
      }
    }
    return res.status(401).json({
      resKey: "LogOut",
      message: "Authorization failed",
    });
  } catch (err: any) {
    console.log("err", err);
    return res.status(401).json({ message: err.error.message });
  }
};
export const getAnApplicationDetails = async (req: any, res: any) => {
  try {
    if (req.user) {
      let result = await ApplicationModel.findOne({
        _id: req.body.id,
      });
      if (result) {
        return res.json(result);
      } else {
        throw new Error("Failed to fetch data");
      }
    }
    return res.status(401).json({
      resKey: "LogOut",
      message: "Authorization failed",
    });
  } catch (err: any) {
    console.log("err", err);
    return res.status(401).json({ message: err.error.message });
  }
};

export const createNewApplication = async (req: any, res: any) => {
  try {
    if (req.user) {
      let newApplication = new ApplicationModel(req.body);
      console.log(
        'req.body.profilePic.file.split(",")[1]',
        req.body.profilePic.file.split(",")[1]
      );
      newApplication.profilePic = {
        file: Buffer.from(req.body.profilePic.file.split(",")[1], "base64"),
        fileName: req.body.profilePic.fileName,
        mimeType: req.body.profilePic.mimeType,
      };
      newApplication.marksSheet = {
        file: Buffer.from(req.body.marksSheet.file, "base64"),
        fileName: req.body.marksSheet.fileName,
        mimeType: req.body.marksSheet.mimeType,
      };
      newApplication.createdBy = req.user._id;
      let result = await newApplication.save();
      if (result) {
        return res.status(201).json(result);
      } else {
        throw new Error("Failed to create");
      }
    }
    return res.status(401).json({
      resKey: "LogOut",
      message: "Authorization failed",
    });
  } catch (err: any) {
    console.log("err", err);
    return res.status(401).json({ message: err.error.message });
  }
};

export const deleteApplication = async (req: any, res: any) => {
  try {
    if (req.user) {
      let result = await ApplicationModel.deleteOne({
        _id: req.body.id,
      });
      if (result) {
        return res.json(result);
      } else {
        throw new Error("Failed to fetch data");
      }
    }
    return res.status(401).json({
      resKey: "LogOut",
      message: "Authorization failed",
    });
  } catch (err: any) {
    console.log("err", err);
    return res.status(401).json({ message: err.error.message });
  }
};
export const updateApplication = async (req: any, res: any) => {
  try {
    if (req.user) {
      let result = await ApplicationModel.deleteOne({
        _id: req.body.id,
      });
      if (result) {
        return res.json(result);
      } else {
        throw new Error("Failed to fetch data");
      }
    }
    return res.status(401).json({
      resKey: "LogOut",
      message: "Authorization failed",
    });
  } catch (err: any) {
    console.log("err", err);
    return res.status(401).json({ message: err.error.message });
  }
};
