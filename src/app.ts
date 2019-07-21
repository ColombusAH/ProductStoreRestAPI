import express from "express";
import fs from "fs";
import path from "path";
import morgan from "morgan";
const routes = require("./routes");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("port", 3000);

//set the log file.
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "./logs/access.log"),
  { flags: "a" }
);
//register morgan to be my logger.
app.use(morgan("combined", { stream: accessLogStream }));

//register routes
app.use(routes);

export { app };
