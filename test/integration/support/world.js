import { setWorldConstructor } from "cucumber";
import sinon from "sinon";

import { listFiles } from "../../../src/list-files/index.js";
let response = {
  Contents: [
    {
      ETag: '"70ee1738b6b21e2c8a43f3a5ab0eee71"',
      Key: "Testfile",
      LastModified: "date",
      Owner: {
        DisplayName: "myname",
        ID: "12345example25102679df27bb0ae12b3f85be6f290b936c4393484be31bebcc"
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
        ID: "12345example25102679df27bb0ae12b3f85be6f290b936c4393484be31bebcc"
      },
      Size: 713193,
      StorageClass: "STANDARD"
    }
  ],
  NextMarker: "eyJNYXJrZXIiOiBudWxsLCAiYm90b190cnVuY2F0ZV9hbW91bnQiOiAyfQ=="
};
class CustomWorld {
  constructor() {
    this.setup();
  }

  setup() {
    this.s3 = {
      listObjects: ({}, callback) => {
        callback(null, response);
      }
    };
    this.bucket = null;
    this.result = null;
  }
  includeCommonPrefixes(folder1, folder2) {
    response.CommonPrefixes = [{ Prefix: folder1 }, { Prefix: folder2 }];
  }
  async listFilesInBucket(testFile) {
    this.result = await listFiles(this.s3, this.bucket);
  }

  cleanUp() {}
}

setWorldConstructor(CustomWorld);
