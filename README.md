# YES|NO

[![Build Status](https://travis-ci.org/mjhea0/yes-no.svg?branch=master)](https://travis-ci.org/mjhea0/yes-no)
[![Coverage Status](https://coveralls.io/repos/github/mjhea0/yes-no/badge.svg?branch=master)](https://coveralls.io/github/mjhea0/yes-no?branch=master)

YES|NO is a real-time polling app for binary decisions

## Getting Started

1. Fork/Clone
1. Install dependencies - `npm install`
1. Rename the *.env_sample* file to *.env* and update
1. Create two local Postgres databases - `straw` and `straw_test`
1. Migrate - `knex migrate:latest --env development`
1. Seed - `knex seed:run --env development`
1. Run the development server - `gulp`

## Test

Without code coverage:

```sh
$ npm test
```

With code coverage:

```sh
$ npm run coverage
```

## Todo

1. Rebrand
1. Test socket.io
1. e2e tests
1. Add auth, remove cookie

## Images

<img src="./images/1.png" width="40%">
<br>
<img src="./images/2.png" width="40%">
