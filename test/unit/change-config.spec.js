import assert from "assert";
import AWS from "aws-sdk";
import { changeConfig } from "../../src/change-config/index.js";

describe("AWS config is changed", function() {
  it("config is called once with params access key id, secret and region", done => {
    AWS.config.update = obj => {
      assert(obj.accessKeyId === "test-key");
      assert(obj.secretAccessKey === "test-secret");
      assert(obj.region === "test-region");
      done();
    };
    changeConfig("test-key", "test-secret", "test-region");
  });
});
