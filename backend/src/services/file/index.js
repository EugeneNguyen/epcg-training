const {S3} = require("@aws-sdk/client-s3");
const path = require('path');
const {v4: uuid} = require('uuid');

const s3 = new S3({
  region: process.env.AWS_S3_REGION,
});

const upload = async (file) => {
  try {
    const key = path.join(process.env.AWS_S3_PATH, uuid(), file.originalname);
    await s3.putObject({
      ACL: 'public-read',
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
    });
    await s3.putObjectAcl({
      ACL: 'public-read',
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    });
    return {
      Key: key,
    };
  } catch (error) {
    console.log(error);
  }
}

const getUrl = async (key) => {
  return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${key}`;
}

module.exports = {
  upload,
  getUrl,
};
