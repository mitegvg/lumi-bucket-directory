/*
Add bucket to response
*/

export const addBucketToObj = (bucket, arrayOfFilesFolders) => {
  return arrayOfFilesFolders.map(f => {
    f.bucket = bucket;
    return f;
  });
};
