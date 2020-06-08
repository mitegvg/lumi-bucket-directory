module.exports = {
  "Change user credentials to false": function(browser) {
    browser
      .url("http://localhost:3001")
      .waitForElementVisible("body")
      .pause(200)
      .click(".change-user-configuration")
      .pause(2000)
      .setValue("#accessKeyId", "wrong-api-key")
      .pause(200)
      .setValue("#secretAccessKey", "wrong-api-secret")
      .pause(200)
      .click(".change-credentials-save")
      .pause(2000);
    browser
      .url("http://localhost:3001")
      .waitForElementVisible("body")
      .pause(200);
    browser.expect.element("#message").text.to.contain("error");
    browser.end();
  }
};
