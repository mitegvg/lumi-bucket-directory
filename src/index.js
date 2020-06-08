import express from "express";
import dotenv from "dotenv";
dotenv.config();
import AWS from "aws-sdk";
import { listFiles } from "./list-files/index.js";
import { listBuckets } from "./list-buckets/index.js";
import { changeConfig } from "./change-config/index.js";
import { downloadFile } from "./download-file/index.js";
export const router = express.Router();

changeConfig();
// Create S3 service object
let s3 = new AWS.S3({ apiVersion: process.env.AWS_API_VERSION });

router.get("/list-files", async (req, res) => {
  const files = await listFiles(
    s3,
    req.query.bucket,
    req.query.limit,
    req.query.delimiter,
    req.query.prefix
  );
  res.send(files);
});

router.get("/list-buckets", async (req, res) => {
  let buckets;
  try {
    buckets = await listBuckets(s3);
  } catch (err) {
    buckets = { error: err }; // TypeError: failed to fetch
  }
  res.send(buckets);
});

router.post("/change-config", (req, res) => {
  const configMessage = changeConfig(
    req.body.accessKeyId,
    req.body.secretAccessKey,
    req.body.region
  );
  s3 = new AWS.S3({ apiVersion: process.env.AWS_API_VERSION });
  res.json({ message: configMessage });
});

router.get("/download", async (req, res) => {
  await downloadFile(s3, res, req.query.bucket, req.query.key);
  res.end("File downloaded");
});
