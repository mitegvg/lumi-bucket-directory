import { Given, When, Then } from "cucumber";
import { expect } from "chai";
Given("the express app", () => {});

When("I set bucket as {string}", function(bucketName) {
  this.bucket = bucketName;
});

When("I call list files api", function() {
  this.listFilesInBucket();
});

When(
  "I include CommonPrefixes in response for folders {string} and {string}",
  function(f1, f2) {
    this.includeCommonPrefixes(f1, f2);
  }
);

Then("there should be a response with {int} files", function(total) {
  expect(this.result.length).to.eql(total);
});

Then("the bucket property should be {string}", function(bucketName) {
  expect(this.result[0].bucket).to.eql(bucketName);
});

Then("the name property of element position {int} should be {string}", function(
  num,
  name
) {
  expect(this.result[num].name).to.eql(name);
});
