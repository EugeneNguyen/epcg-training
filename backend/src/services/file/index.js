const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const path = require('path');
const fs = require('fs');
const REGION = "REGION"; //e.g. "us-east-1"
const s3Client = new S3Client({ region: REGION });

const file = "OBJECT_PATH_AND_NAME"; // Path to and name of object. For example '../myFiles/index.js'.
const fileStream = fs.f(file);

async function upload(file, path) {
  const uploadParams = {
    Bucket: "binhnguyenorg",
    // Add the required 'Key' parameter using the 'path' module.
    Key: path.basename(file),
    // Add the required 'Body' parameter
    Body: fileStream,
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    console.log("Success", data);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
}

module.exports = {
  upload,
}