import { listFolders } from "./hooks/ROL-001-list-folders.js";
import { addBucketToObj } from "./hooks/ROL-002-add-bucket-to-obj.js";

export const listFiles = (
  s3,
  bucketName,
  limit = 100,
  delimiter = "/",
  prefix
) => {
  return new Promise((resolve, reject) => {
    const obj = {
      Bucket: bucketName,
      MaxKeys: limit,
      Delimiter: delimiter
    };
    if (prefix && prefix !== "...") {
      obj.Prefix = prefix;
    }
    s3.listObjects(obj, (err, data) => {
      if (err) {
        reject({
          message: "There was an error listing your files: " + err.message
        });
      } else {
        const folders = listFolders(data.CommonPrefixes);
        const contents = data.Contents.map(function(item) {
          const nameOnly = item.Key.replace(prefix, "");
          if (nameOnly === "") {
            item.name = "...";
            item.type = "folder";
          } else {
            item.name = nameOnly;
          }

          return item;
        });
        const response = addBucketToObj(bucketName, folders.concat(contents));

        resolve(response);
      }
    });
  });
};
