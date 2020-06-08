module.exports = {
  "Display list of buckets and basic elements on page": function(browser) {
    browser
      .url("http://localhost:3001")
      .waitForElementVisible("body")
      .pause(200);

    browser.expect.element(".bucket-list").text.to.contain("lumi-directory");
    browser.expect
      .element(".change-user-configuration")
      .text.to.contain("Change User Configuration");
    browser.end();
  }
};
