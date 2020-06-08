import express from "express";

import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

// all routes in src
import { router } from "./src/index.js";
const app = express();
const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use("/", router);
app.use(express.static("public"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
