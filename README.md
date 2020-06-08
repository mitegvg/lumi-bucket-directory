# Bucket directory

This repo represents a view of a private bucket repo. You can view and download files or change the user configuration to get another AWS user and his buckets.

## How to set it up locally

Please use node version > 13 as the tests are using esm which is enabled only on higher versions of node.

To start it use:

`npm start`

or to develop it (starts with nodemon)

`npm run start-local`

## Tests

There are three sets of tests:

### Unit

To start them run:

`npm run test`

Note that the frontend tests are in the same folder - test/unit/. There can be separation of the frontend and backend so these can be moved out.

### Integration

To start them run:

`npm run test-integration`

I formulated integration tests to test different units/functions working together to deliver a feature.

### System

To start them run:

`npm run test-system`

System are my end to end tests, testing both the frontend and backend mocking a real user that opens a browsers and clicks something.
