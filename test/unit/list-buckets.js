import assert from "assert";
import { listBuckets } from "../../src/list-buckets/index.js";

describe("List buckets", function() {
  let list;
  before(async () => {
    const response = {
      Buckets: [
        {
          CreationDate: "date",
          Name: "examplebucket"
        },
        {
          CreationDate: "date",
          Name: "examplebucket2"
        },
        {
          CreationDate: "date",
          Name: "examplebucket3"
        }
      ],
      Owner: {
        DisplayName: "own-display-name",
        ID: "examplee7a2f25102679df27bb0ae12b3f85be6f290b936c4393484be31"
      }
    };

    const s3 = {
      listBuckets: ({}, callback) => {
        callback(null, response);
      }
    };
    list = await listBuckets(s3);
  });

  it("should return an array of buckets", async () => {
    assert(list.length === 3);
  });
  it("there is a key in first element", async () => {
    assert(list[0].Name === "examplebucket");
  });
  it("there is a creation date in first element", async () => {
    assert(list[0].CreationDate === "date");
  });
});
