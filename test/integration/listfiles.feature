Feature: List files
  In order get a list of files from s3
  As a developer
  I want to send a request to get those files

  Scenario: List files in a bucket
    Given the express app
    When I set bucket as "testbucket"
    When I call list files api
    Then there should be a response with 2 files
    Then the bucket property should be "testbucket"
    Then the name property of element position 0 should be "Testfile"

  Scenario: List folders in a bucket
    Given the express app
    When I include CommonPrefixes in response for folders "folderName" and "folderName2"
    When I call list files api
    Then there should be a response with 4 files
    Then the name property of element position 0 should be "folderName"
    Then the name property of element position 1 should be "folderName2"
