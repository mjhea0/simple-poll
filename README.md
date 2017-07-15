# Simple Poll

[![Build Status](https://travis-ci.org/mjhea0/simple-poll.svg?branch=master)](https://travis-ci.org/mjhea0/simple-poll)
[![Coverage Status](https://coveralls.io/repos/github/mjhea0/simple-poll/badge.svg?branch=master)](https://coveralls.io/github/mjhea0/simple-poll?branch=master)

Simple Poll is a real-time polling app for binary decisions.

## Getting Started

1. Fork/Clone
1. Install dependencies - `npm install`
1. Rename the *.env_sample* file to *.env* and update
1. Create two local Postgres databases - `chant` and `chant_test`
1. Migrate - `knex migrate:latest --env development`
1. Seed - `knex seed:run --env development`
1. Run the development server - `gulp` (`http://127.0.0.1:3000/`)

## Test

Without code coverage:

```sh
$ npm test
```

With code coverage:

```sh
$ npm run coverage
```
