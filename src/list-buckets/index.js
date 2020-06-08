import AWS from "aws-sdk";

export const listBuckets = s3 => {
  return new Promise((resolve, reject) => {
    s3.listBuckets({}, (err, data) => {
      if (err) {
        reject({
          message: "There was an error listing your buckets: " + err.message
        });
      } else {
        const response = data.Buckets.map(function(item) {
          item.name = item.Key;
          return item;
        });
        resolve(response);
      }
    });
  });
};
