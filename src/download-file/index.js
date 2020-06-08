export const downloadFile = (s3, res, bucket, key) => {
  return new Promise((resolve, reject) => {
    const options = {
      Bucket: bucket,
      Key: key
    };

    res.attachment(key);
    const fileStream = s3.getObject(options).createReadStream();
    fileStream.pipe(res);
  });
};
