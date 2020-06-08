import assert from "assert";
import sinon from "sinon";
import app from "../../public/frontend-functions.js";

describe("Frontend tests", function() {
  it("Load buckets test", async () => {
    const methods = app.methods;
    sinon.stub(methods, "fetch").resolves({
      json: () => {
        return [{ Key: "Testbucket" }];
      }
    });
    const buckets = await methods.loadBuckets();
    assert(buckets[0].Key === "Testbucket");
    sinon.restore();
  });
  it("Load files test", async () => {
    const methods = app.methods;
    sinon.stub(methods, "fetch").resolves({
      json: () => {
        return [{ Key: "Testfile" }];
      }
    });
    const files = await methods.loadFiles();
    assert(files[0].Key === "Testfile");
    sinon.restore();
  });
  it("Change config test", async () => {
    const methods = app.methods;
    sinon.stub(methods, "fetch").resolves({
      json: () => {
        return { message: "success" };
      }
    });
    const res = await methods.changeCredentials();
    assert(res.message === "success");
    sinon.restore();
  });
});
