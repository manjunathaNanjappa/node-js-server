import express, { Application, Request } from "express";
import mongoose from "mongoose";
import { mainRouter } from "./router/main.router";
import bodyParser from "body-parser";
const cors = require("cors");

const JWT = require("jsonwebtoken");

const app: Application = express();

const PORT = 8080;

// THIS STRING IS THE LINK TO OUR MONGODB
const url = "mongodb://127.0.0.1:27017/test";

// mongodb connection
let connection: any = mongoose
  .connect(url)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(cors());

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb" }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req: any, res: any, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    JWT.verify(
      req.headers.authorization.split("Bearer ")[1],
      "P@55w0rd",
      function (err: any, decode: any) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});

mainRouter(app);

app.listen(PORT, () => console.log(`app running on port ${PORT}`));
