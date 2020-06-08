module.exports = {
  "Navigate in a bucket, through files and folders": function(browser) {
    browser
      .url("http://localhost:3001")
      .waitForElementVisible("body")
      .pause(200)
      .click(".bucket-list-link")
      .pause(2000);

    browser.expect.element(".files-table").text.to.contain("empty-dir");
    browser.expect.element(".files-table").text.to.contain("test-dir");
    browser.expect.element(".files-table").text.to.contain("Senior");
    browser.click(".file-list-link").pause(2000);
    browser.expect.element(".files-table").text.to.contain("...");

    browser.end();
  }
};
