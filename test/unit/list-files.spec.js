import assert from "assert";
import { listFiles } from "../../src/list-files/index.js";

describe("List files and folders", function() {
  let list, response, s3;
  before(async () => {
    response = {
      Contents: [
        {
          ETag: '"70ee1738b6b21e2c8a43f3a5ab0eee71"',
          Key: "example1.jpg",
          LastModified: "date",
          Owner: {
            DisplayName: "myname",
            ID:
              "12345example25102679df27bb0ae12b3f85be6f290b936c4393484be31bebcc"
          },
          Size: 11,
          StorageClass: "STANDARD"
        },
        {
          ETag: '"9c8af9a76df052144598c115ef33e511"',
          Key: "example2.jpg",
          LastModified: "date",
          Owner: {
            DisplayName: "myname",
            ID:
              "12345example25102679df27bb0ae12b3f85be6f290b936c4393484be31bebcc"
          },
          Size: 713193,
          StorageClass: "STANDARD"
        }
      ],
      NextMarker: "eyJNYXJrZXIiOiBudWxsLCAiYm90b190cnVuY2F0ZV9hbW91bnQiOiAyfQ=="
    };

    s3 = {
      listObjects: ({}, callback) => {
        callback(null, response);
      }
    };
    list = await listFiles(s3);
  });
  describe("List files", function() {
    it("should return an array of files", async () => {
      assert(list.length === 2);
    });
    it("there is a key in first element", async () => {
      assert(list[0].Key === "example1.jpg");
    });
    it("there is a name in first element", async () => {
      assert(list[0].name === "example1.jpg");
    });
  });
  describe("List folders", function() {
    it("should return folders", async () => {
      response.CommonPrefixes = [{ Prefix: "folderName" }];
      list = await listFiles(s3);
      assert(list[0].type === "folder");
    });
  });
  describe("Bucket property should be defined", function() {
    it("should return folders", async () => {
      list = await listFiles(s3, "bucketName");
      assert(list[0].bucket === "bucketName");
    });
  });
});
