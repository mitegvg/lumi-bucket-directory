import AWS from "aws-sdk";
export const changeConfig = (accessKeyId, secretAccessKey, region) => {
  try {
    AWS.config.update({
      accessKeyId: accessKeyId || process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: secretAccessKey || process.env.AWS_SECRET_ACCESS_KEY,
      region: region || process.env.AWS_REGION
    });
    return "Successfully changed";
  } catch (e) {
    return "Error:" + e;
  }
};
